import { Request, Response } from 'express'
import AWS from 'aws-sdk'

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' })
const sns = new AWS.SNS({ credentials, region: 'sa-east-1' })

interface ILog {
  SubscriptionArn?: string;
  Protocol?: string;
  Endpoint?: string;
}

class AWSController {
  async status(request: Request, response: Response) {
    response.json({
      status: 'ok',
      sns
    })
  }

  async Subcribe(request: Request, response: Response) {
    let params = {
      Protocol: 'EMAIL',
      TopicArn: process.env.ARN || '',
      Endpoint: request.body.email,
      ReturnSubscriptionArn: true,
    }

    sns.subscribe(params, (err, data) => {
      if(err) console.log(err)
      
      response.send(data)
    })
  }

  async ConfirmSub(request: Request, response: Response) {
    let params = {
      Token: request.body.token,
      TopicArn: process.env.ARN || ''
    }

    sns.confirmSubscription(params, (err, data) => {
      if(err) console.log(err)

      response.json({
        message: data
      })
    })
  }

  async Logs(request: Request, response: Response){
    let params = {
        NextToken: request.body.total
    }

    let LogsRes: ILog[]

    sns.listSubscriptions(params, (err, data) => {
        if (err) console.log(err)

        let SubscribeIsDeleted = data.Subscriptions

        let LogsRes = SubscribeIsDeleted?.map((e) => [
          e.Endpoint,
          e.SubscriptionArn
        ])

        response.json(data)
    })
  }

  async onNotificationEmail(request: Request, response: Response) {
    let params = {
      Protocol: 'EMAIL',
      TopicArn: process.env.NOTIFICATIONARN || '',
      Endpoint: request.body.email,
      ReturnSubscriptionArn: true,
    }

    sns.subscribe(params, (err, data) => {
      if(err) console.log(err)
      
      response.send(data)
    })

    console.log({
      params
    })
  }

}

export {AWSController}