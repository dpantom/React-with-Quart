from __future__ import annotations

# Builtin Imports
import logging
import sys

# External Imports
from quart import Blueprint

# Local Imports
from src.views.app_view import AppView

# region functions
def build_blueprint() -> Blueprint:
    """
    Function used to build the flask blueprint for the controller, wraps all of the blueprint route functions.
    This is done to allow the configuration to be used easily in the blueprint route functions.

    Returns: 
        Blueprint: The blueprint containing all the directed routes
    """
    try:
        blueprint = Blueprint('blueprint', __name__)

        # Instantiate logger
        logging.basicConfig(level=logging.INFO, format='%(asctime)s :: %(asctime)s :: %(name)s :: %(levelname)s :: %(message)s')
        logger = logging.getLogger()

        # Create the different views
        app_view = AppView.as_view("app_view")

        # Define the different routes for this blueprint
        blueprint.add_websocket("/ws", view_func=app_view)

        return blueprint
    except Exception as e:
        traceback = sys.exc_info()[-1]
        assert traceback is not None
        
        print("Webserver Service Creation - Error on line {}".format(traceback.tb_lineno), type(e).__name__, e)

        raise
# endregion