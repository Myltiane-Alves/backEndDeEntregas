import { Router } from 'express'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/FindAllAvailableController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';


const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

routes.post('/authenticate/', authenticateClientController.handle);
routes.post('/deliveryman/autenticate', authenticateDeliverymanController.handle)

routes.post('/client/', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);

routes.post('/delivery',ensureAuthenticateClient,  deliveryController.handle);
routes.get('/delivery/available', findAllAvailableController.handle)
export { routes };
