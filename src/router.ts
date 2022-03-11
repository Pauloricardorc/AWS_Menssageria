import { Router } from 'express'
import { AWSController } from './controllers/AWSControllers'

const router = Router()

const AWS_StatusController = new AWSController()

router.get('/status', AWS_StatusController.status)

router.post('/aws/logs', AWS_StatusController.Logs)

router.post('/subscribe', AWS_StatusController.Subcribe)

router.post('/confirm/subscribe', AWS_StatusController.ConfirmSub)

router.post('/notification', AWS_StatusController.onNotificationEmail)

export { router }