# Builtin Imports
import asyncio
import logging
import time

# External Imports
from quart import websocket
from pydantic import TypeAdapter, ValidationError

# Local Imports
from src.views.websocket_view import WebsocketView

# Setting logger
logging.basicConfig(level=logging.INFO, filename="logger.log", filemode="w",
                    format="%(levelname)s - %(message)s\n")

logger = logging.getLogger("logger")

class AppView(WebsocketView):
    '''
    This view handles incoming listener connections.
    '''

    async def dispatch_request(self):
        '''
        Parsing messages from the websocket then checking the message type.
        This determines what to do
        '''
        try:
            # Always looking for messages sent from the websocket
            while True:
                ws_msg = await websocket.receive()

                # TODO
                # implement how you will handle the messages


                await websocket.send(ws_msg)
        except ValidationError as error:
            logger.exception(error)