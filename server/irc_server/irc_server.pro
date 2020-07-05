QT -= gui

CONFIG += c++11 console
CONFIG -= app_bundle

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

LIBS += -L"lib/libboost_thread-mgw8-mt-d-x32-1_73" -lthread

SOURCES += \
        main.cpp

DISTFILES += \
    lib/libboost_thread-mgw8-mt-d-x32-1_73.a \
    lib/libboost_thread-mgw8-mt-x32-1_73.a \ \
    websocketpp/CMakeLists.txt

HEADERS += \
    websocketpp/base64/base64.hpp \
    websocketpp/client.hpp \
    websocketpp/close.hpp \
    websocketpp/common/asio.hpp \
    websocketpp/common/asio_ssl.hpp \
    websocketpp/common/chrono.hpp \
    websocketpp/common/connection_hdl.hpp \
    websocketpp/common/cpp11.hpp \
    websocketpp/common/functional.hpp \
    websocketpp/common/md5.hpp \
    websocketpp/common/memory.hpp \
    websocketpp/common/network.hpp \
    websocketpp/common/platforms.hpp \
    websocketpp/common/random.hpp \
    websocketpp/common/regex.hpp \
    websocketpp/common/stdint.hpp \
    websocketpp/common/system_error.hpp \
    websocketpp/common/thread.hpp \
    websocketpp/common/time.hpp \
    websocketpp/common/type_traits.hpp \
    websocketpp/concurrency/basic.hpp \
    websocketpp/concurrency/none.hpp \
    websocketpp/config/asio.hpp \
    websocketpp/config/asio_client.hpp \
    websocketpp/config/asio_no_tls.hpp \
    websocketpp/config/asio_no_tls_client.hpp \
    websocketpp/config/boost_config.hpp \
    websocketpp/config/core.hpp \
    websocketpp/config/core_client.hpp \
    websocketpp/config/debug.hpp \
    websocketpp/config/debug_asio.hpp \
    websocketpp/config/debug_asio_no_tls.hpp \
    websocketpp/config/minimal_client.hpp \
    websocketpp/config/minimal_server.hpp \
    websocketpp/connection.hpp \
    websocketpp/connection_base.hpp \
    websocketpp/endpoint.hpp \
    websocketpp/endpoint_base.hpp \
    websocketpp/error.hpp \
    websocketpp/extensions/extension.hpp \
    websocketpp/extensions/permessage_deflate/disabled.hpp \
    websocketpp/extensions/permessage_deflate/enabled.hpp \
    websocketpp/frame.hpp \
    websocketpp/http/constants.hpp \
    websocketpp/http/impl/parser.hpp \
    websocketpp/http/impl/request.hpp \
    websocketpp/http/impl/response.hpp \
    websocketpp/http/parser.hpp \
    websocketpp/http/request.hpp \
    websocketpp/http/response.hpp \
    websocketpp/impl/connection_impl.hpp \
    websocketpp/impl/endpoint_impl.hpp \
    websocketpp/impl/utilities_impl.hpp \
    websocketpp/logger/basic.hpp \
    websocketpp/logger/levels.hpp \
    websocketpp/logger/stub.hpp \
    websocketpp/logger/syslog.hpp \
    websocketpp/message_buffer/alloc.hpp \
    websocketpp/message_buffer/message.hpp \
    websocketpp/message_buffer/pool.hpp \
    websocketpp/processors/base.hpp \
    websocketpp/processors/hybi00.hpp \
    websocketpp/processors/hybi07.hpp \
    websocketpp/processors/hybi08.hpp \
    websocketpp/processors/hybi13.hpp \
    websocketpp/processors/processor.hpp \
    websocketpp/random/none.hpp \
    websocketpp/random/random_device.hpp \
    websocketpp/roles/client_endpoint.hpp \
    websocketpp/roles/server_endpoint.hpp \
    websocketpp/server.hpp \
    websocketpp/sha1/sha1.hpp \
    websocketpp/transport/asio/base.hpp \
    websocketpp/transport/asio/connection.hpp \
    websocketpp/transport/asio/endpoint.hpp \
    websocketpp/transport/asio/security/base.hpp \
    websocketpp/transport/asio/security/none.hpp \
    websocketpp/transport/asio/security/tls.hpp \
    websocketpp/transport/base/connection.hpp \
    websocketpp/transport/base/endpoint.hpp \
    websocketpp/transport/debug/base.hpp \
    websocketpp/transport/debug/connection.hpp \
    websocketpp/transport/debug/endpoint.hpp \
    websocketpp/transport/iostream/base.hpp \
    websocketpp/transport/iostream/connection.hpp \
    websocketpp/transport/iostream/endpoint.hpp \
    websocketpp/transport/stub/base.hpp \
    websocketpp/transport/stub/connection.hpp \
    websocketpp/transport/stub/endpoint.hpp \
    websocketpp/uri.hpp \
    websocketpp/utf8_validator.hpp \
    websocketpp/utilities.hpp \
    websocketpp/version.hpp
