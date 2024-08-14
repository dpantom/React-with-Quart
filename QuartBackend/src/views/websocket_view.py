# Builtin Imports
from typing import Any, Callable, ClassVar, Optional, TypeVar

# External Imports
from quart.globals import current_app
from quart.typing import ResponseReturnValue, WebsocketCallable

TWebsocket = TypeVar("TWebsocket", bound=WebsocketCallable)

class WebsocketView:
    """
    Use to define websocket routes within a class structure
    
    A View subclass must implement the :meth:'dispatch_request' in
    order to respond to requests. For automatic method finding based on
    the reqeuest HTTP Verb see :class:'MethodView'.
    
    Attributes:
    decorators: A list of decorators to apply to a view
        method. The decorators are applied in the order of
        the list
    provide_automatic_options: Override automatic OPTIONS
        if set, to either True or False.
    init_every_reqeust: Create a new instance of this class
        for every request.
    """

    decorators: ClassVar[list[Callable]] = []
    provide_automatic_options: ClassVar[bool | None] = None
    init_every_request: ClassVar[bool] = True

    async def dispatch_request(self, **kwargs: Any) -> Optional[ResponseReturnValue]:
        '''
        Override and return a Response

        This will be called with the request view_ars, i.e. any url params
        '''
        raise NotImplementedError()
    
    @classmethod
    def as_view(cls, name: str, *class_args: Any, **class_kwargs: Any) -> WebsocketCallable:
        if cls.init_every_request:

            async def view(**kwargs: Any) -> ResponseReturnValue:
                self = view.view_class(*class_args, **class_kwargs) # type: ignore
                return await current_app.ensure_async(self.dispatch_request)(**kwargs)
        else:
            self = cls(*class_args, **class_kwargs)

            async def view(**kwargs: Any) -> ResponseReturnValue:
                return await current_app.ensure_async(self.dispatch_request)(**kwargs) # type: ignore
            
        if cls.decorators:
            view.__name__ = name
            view.__module__ = cls.__module__
            for decorator in cls.decorators:
                view = decorator(view)

        view.view_class: type[WebsocketCallable] = cls # type: ignore
        view.__name__ = name
        view.__doc__ = cls.__doc__
        view.__module__ = cls.__module__
        view.provide_automatic_options = cls.provide_automatic_options # type: ignore

        return view

