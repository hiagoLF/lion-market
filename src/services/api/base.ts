import axios from "axios";
import configDefinitions from '../../../lion-market-config.json'

export const api = axios.create({
  baseURL: (
    configDefinitions.development ? (
      configDefinitions.fakeApi ? 'api' : configDefinitions.developmentApiBaseUrl
    ) : configDefinitions.productionApiBaseUrl
  ),
});
