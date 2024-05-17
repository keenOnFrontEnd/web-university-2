document.getElementById('generateButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput').files[0];
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const scheduleData = JSON.parse(event.target.result);
                generateSchedule(scheduleData);
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(fileInput);
    } else {
        alert('Please select a file');
    }
});

function generateSchedule(data) {
    const scheduleContainer = document.getElementById('scheduleContainer');
    scheduleContainer.innerHTML = '';

    data.schedule.forEach(day => {
        const dayContainer = document.createElement('div');
        dayContainer.className = 'schedule-day';

        const dateHeading = document.createElement('h2');
        dateHeading.textContent = day.date;
        dayContainer.appendChild(dateHeading);

        day.lessonList.forEach(lesson => {
            const lessonDiv = document.createElement('div');
            lessonDiv.className = 'lesson';

            const subject = document.createElement('p');
            subject.textContent = `Subject: ${lesson.subject}`;
            lessonDiv.appendChild(subject);

            const time = document.createElement('p');
            time.textContent = `Time: ${lesson.time}`;
            lessonDiv.appendChild(time);

            const teacher = document.createElement('p');
            teacher.textContent = `Teacher: ${lesson.teacher}`;
            lessonDiv.appendChild(teacher);

            const classroom = document.createElement('p');
            classroom.textContent = `Classroom: ${lesson.classroom}`;
            lessonDiv.appendChild(classroom);

            dayContainer.appendChild(lessonDiv);
        });

        scheduleContainer.appendChild(dayContainer);
    });
}
