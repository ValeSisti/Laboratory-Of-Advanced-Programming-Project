var amqp = require('amqplib/callback_api')
module.exports = (callback) => {
  amqp.connect(
    "amqps://wpbdkfmz:ogy2Gt6Gd2-rvlOpngNOFTz_X_LhdFUe@sparrow.rmq.cloudamqp.com/wpbdkfmz",
    (error, conection) => {
      if (error) {
        throw new Error(error);
      }

      callback(conection);
    }
  );
}