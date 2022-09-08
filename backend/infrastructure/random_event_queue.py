import random
from datetime import datetime
from typing import List

from backend.domain.entities.event import Event
from backend.domain.port.event_queue import EventQueue


class RandomEventQueue(EventQueue):
    def get_new_events(self) -> List[Event]:
        if random.random() > 0.9:
            return [Event(type="An Event", instant=datetime.now())]
        else:
            return []

