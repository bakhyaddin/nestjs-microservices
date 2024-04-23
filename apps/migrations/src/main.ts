import Datasource from './ormconfig';

export default (async () => {
  const dataSource = await Datasource;
  await dataSource.initialize();
  await dataSource.runMigrations();
  await dataSource.destroy();
  console.log('MIGRATIONS FINISHED');
})();
