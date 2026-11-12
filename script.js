const defaultEvents = [
    {
        title: "Community Meetup",
        date: "2026-11-12",
        time: "10:00 AM",
        location: "Community Centre"
    },

    {
        title: "Volunteer Training",
        date: "2026-11-18",
        time: "2:00 PM",
        location: "Main Office"
    },

    {
        title: "Community Cleanup",
        date: "2026-11-25",
        time: "9:00 AM",
        location: "City Park"
    }
];

let events = JSON.parse(localStorage.getItem("volunteerEvents")) || [];

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthYear = document.getElementById("month-year");
const calendar = document.getElementById("calendar");

let selectedDate = "";

function renderCalendar() {

    // Update month and year heading
    const date = new Date(currentYear, currentMonth);

    monthYear.textContent = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    // Clear the previous calendar
    calendar.innerHTML = "";

    // Get number of days
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate first weekday
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const startingDay = (firstDay + 6) % 7;

    // Generate empty spaces
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement("div");
        calendar.appendChild(emptyDay);
    }

    // Generate dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");

        dayElement.classList.add("calendar-day");
        dayElement.textContent = day;

        const calendarDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const dayEvents = events.filter(event => {
    return event.date === calendarDate;
});

dayEvents.forEach(event => {

    const eventTitle = document.createElement("div");

    eventTitle.classList.add("calendar-event");

    eventTitle.textContent = event.title;

    dayElement.appendChild(eventTitle);

});

        dayElement.addEventListener("click", function() {

    
               selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    document.getElementById("selected-date").textContent =
        `Add an event for ${selectedDate}`;

    document.getElementById("event-form").hidden = false;
    
    console.log("You clicked day:", day);
});

        calendar.appendChild(dayElement);
    }
}

const nextButton = document.getElementById("next-month");

nextButton.addEventListener("click", function() {

    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
});

const saveEvent = document.getElementById("save-event");

saveEvent.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("event-title").value;
    const description = document.getElementById("event-description").value;

    const newEvent = {
        title: title,
        description: description,
        date: selectedDate
    };

    events.push(newEvent);

    localStorage.setItem("volunteerEvents", JSON.stringify(events));

    saveEvent.reset();

    document.getElementById("event-form").hidden = true;

    renderCalendar();
});

renderCalendar();

const cancelButton = document.getElementById("cancel-event");

cancelButton.addEventListener("click", function() {
    document.getElementById("event-form").hidden = true;
    saveEvent.reset();
})

const prevButton = document.getElementById("prev-month")

prevButton.addEventListener("click", function() {

    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
});