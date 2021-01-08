import React, { useState, useEffect } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    Promise.all([axios.get('/api/events'), axios.get('/api/todos')])
      .then((results) => {
        setEvents(results[0].data);
        setTodos(results[1].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEventAdd = () => {
    axios.post('/api/events', {
      userEmail,
      name,
      tagId,
      startTime,
      endTime,
    })
      .then((results) => {

      })
      .catch((err) => console.error(err));
  };

  const handleEventChange = (id) => {
    axios.put('/api/events', {
      userEmail,
      name,
      tagId,
      startTime,
      endTime,
    })
      .then((results) => {

      })
      .catch((err) => console.error(err));
  };

  const handleEventRemove = (id) => {
    axios.delete(`/api/events/${id}`, {
      userEmail,
      name,
      tagId,
      startTime,
      endTime,
    })
      .then((results) => {

      })
      .catch((err) => console.error(err));
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setEvents(events);
  };

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  const renderSidebarEvent = (event) => (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );

  return (
    <div className="demo-app">
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section" />
      </div>
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'today prev,next title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          initialEvents={events}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange}
          eventRemove={handleEventRemove}
        />
      </div>
    </div>
  );
};

export default Calendar;
