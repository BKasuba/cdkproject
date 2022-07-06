
//This is the logic of the lambda

exports.main = async function(event, context) {
    return{
        statusCode: 200,
        body: 'hello lambda'
    }
}