import Bee from 'bee-queue';
import EnrollmentMail from '../app/jobs/EnrollmentMail';
import HelpOrdersMail from '../app/jobs/HelpOrdersMail';
import redisConfig from '../config/redis';
// Jobs
const jobs = [EnrollmentMail, HelpOrdersMail];
class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    try {
      jobs.forEach(({ key, handle }) => {
        this.queues[key] = {
          bee: new Bee(key, {
            redis: redisConfig,
          }),
          handle,
        };
      });
    } catch (error) {
      console.log(`Houve um erro! message: ${error.message}`);
    }
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
    console.log('Background jobs estão rodando!');
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}, FAILED`, err.message);
  }
}

export default new Queue();
