import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Container } from '../../hoc/layout/elements/index.jsx';
import Tabs from '../../components/Tabs/Tabs.jsx';
import TodoList from '../../components/TodoList/TodoList.jsx';

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
`;

const CalendarContainer = styled.div`
  flex-grow: 1;
`;

const Home = () => {
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
    <Container>
      <ContentWrapper>
        <Tabs />
        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'title',
              center: 'timeGridDay,timeGridWeek,dayGridMonth',
              right: 'prev today next',
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
        </CalendarContainer>
        <TodoList />
      </ContentWrapper>
    </Container>
  );
};

export default Home;
