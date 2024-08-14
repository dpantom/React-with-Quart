# External Imports
from quart import Quart
from quart.logging import default_handler

# builtin Imports
import logging

# Local Imports
from src.views.blueprint import build_blueprint

logging.basicConfig(level=logging.INFO, filename="logger.log", filemode="w",
                    format="%(levelname)s - %(message)s\n")

logger = logging.getLogger("logger")

logger.info("Creating Server...")

app = Quart(__name__)

app.register_blueprint(build_blueprint(), url_prefix="/api")

app.run()