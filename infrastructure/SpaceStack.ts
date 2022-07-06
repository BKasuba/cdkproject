import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { handler } from '../Services/Node-lambda/hello';


export class SpaceStack extends Stack{

    private api = new RestApi(this,'SpaceApi');
    private spacesTable = new GenericTable(
        'SpacesTable',
        'spaceID',
        this
    )

    constructor(scope: Construct,id: string, props: StackProps){
        super(scope,id,props)



        //Below is what maps the lambda itself to the function which will have the logic in it. It points to the main function in the hello.js file
        const helloLambda = new LambdaFunction(this, 'helloLambda',{
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname,'..','Services','Hello')),
            handler: 'hello.main'
        })

        const helloLambdaNodeJs = new NodejsFunction(this,'helloLambdaNodeJs', {
            entry: (join(__dirname,'..','Services','Node-lambda','hello.ts')),//points to the file with implementation
            handler: 'handler'
        })

        //Hello api lambda integration, the integration calls the helloLambda defined above
        const helloLambdaIntegration = new LambdaIntegration(helloLambda)
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration)


    }



}