from datetime import datetime


class Event:
    def __init__(self, type: str, instant: datetime):
        self.instant: datetime = instant
        self.type: str = type
