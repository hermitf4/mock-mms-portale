const exec = require('child_process').exec;
console.log('Java env variable -> ' + process.env.JAVA_HOME);
const basePath = __dirname;
const folderApi = 'src/app/core/api/be';


const rimraf = require("rimraf");

new Promise((resolve, reject) => {
  rimraf("src/app/core/api", {
    /**
     * Lately there are some serious problems of ENOEMPTY errors
     * And other EPERMs. Setting a bigger number of retries should solve
     * the issue.
     */
    maxBusyTries: 20
  }, (err) => {

    if (err) {
      reject(err);
    } else {
      resolve();
    }

  });
}).then(() => {

  console.log('API folder deleted');

  return Promise.all([
      new Promise((resolve, reject) => {
        exec(`java -jar "${basePath}/config/swagger/swagger-codegen-cli-2.4.17.jar" generate -i http://localhost:8090/v2/api-docs -l typescript-angular -o ${folderApi} --additional-properties ngVersion=12.0.0`,
          (error, stdout) => {
            if (error !== null) {
              reject(error);
            } else {
              console.log('Output -> ' + stdout + ' ' + folderApi);
              resolve();
            }
          })
      })
  ]);

}).catch(error => {
  console.error('Error -> %o', error);
});
