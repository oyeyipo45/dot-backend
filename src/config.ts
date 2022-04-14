const environments: any = {};
environments.test = {
  port: `${process.env.PORT}`,
  database: `${process.env.TEST_MONGODB}`,
  envName: 'test enviroment',
  site: `http://localhost:${process.env.PORT}`,
};
environments.development = {
  port: `${process.env.PORT}`,
  database: `${process.env.DEV_MONGODB}`,
  envName: 'Development enviroment',
  site:   `http://localhost:${process.env.PORT}`,
};
environments.production = {
  port: `${process.env.PORT}`,
  database: `${process.env.PROD_MONGODB}`,
  envName: 'Production enviroment',
  site: '',
};

const currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.production;

// Export Module
export default environmentToExport;
