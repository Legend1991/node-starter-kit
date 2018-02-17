const CallInterceptorTest = require('./call-interceptor.test')
const CallInterceptor = require('../src/call-interceptor')

let callInterceptorTest = new CallInterceptorTest(CallInterceptor)
callInterceptorTest.run()
