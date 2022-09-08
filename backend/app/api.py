import random
import time
from typing import List
import json
from fastapi import APIRouter, FastAPI
from sse_starlette.sse import EventSourceResponse
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from backend.domain.entities.event import Event
from backend.infrastructure.random_event_queue import RandomEventQueue

cors_middleware: Middleware = Middleware(CORSMiddleware,
                                         allow_origins=['http://localhost:4200',
                                                        'https://localhost:4200'],
                                         allow_credentials=['*'],
                                         allow_methods=['*'],
                                         allow_headers=['*'])
app: FastAPI = FastAPI(middleware=[cors_middleware])
event_queue: RandomEventQueue = RandomEventQueue()


def is_there_any_events():
    while True:
        time.sleep(1)
        new_events: List[Event] = event_queue.get_new_events()
        for event in new_events:
            data = {
                'type': event.type,
                'instant': json.dumps(event.instant, default=str)
            }
            yield dict(data=json.dumps(data))


@app.get('/events')
async def get_priorities_event_route():
    return EventSourceResponse(is_there_any_events())


@app.get('/data')
def get_data():
    return dict(data=random.choice(['On', 'Off', 'Starting', 'Stopping', 'Unknown']))
