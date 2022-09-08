from abc import ABC, abstractmethod
from typing import List

from backend.domain.entities.event import Event


class EventQueue(ABC):
    @abstractmethod
    def get_new_events(self) -> List[Event]:
        pass
