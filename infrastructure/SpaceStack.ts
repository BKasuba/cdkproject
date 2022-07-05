import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'


export class SpaceStack extends Stack{

    private api = new RestApi(this,'SpaceApi')

    constructor(scope: Construct,id: string, props: StackProps){
        super(scope,id,props)



        //Below is what maps the lambda itself to the function which will have the logic in it. It points to the main function in the hello.js file
        const helloLambda = new LambdaFunction(this, 'helloLambda',{
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname,'..','Services','Hello')),
            handler: 'hello.main'
        })

        //Hello api lambda integration
        const helloLambdaIntegration = new LambdaIntegration(helloLambda)
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration)


    }



}