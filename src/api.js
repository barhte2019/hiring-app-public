import axios from 'axios';

function api() {
  const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
  const axiosConfig = {
    headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer ' + tokens.token,
      'Content-Type': 'application/json'
    },
    timeout: 10000,
  };

  axiosConfig.baseURL = window['_env_'].KIE_URL;
  
  return axios.create(axiosConfig);
}

export default {
  jobs: {
    detail: (jobId ) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/caseFile?name=hiringPetition
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/caseFile';
      return api().get(url, {
        params: { 'name': 'hiringPetition' }
      });
    },
    list: (page, pageSize) => api().get(
      'services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.job-vacancy-lifecycle/instances',
      {
        params: {
          page,
          'page_size': pageSize
        }
      }
    ),
    milestones: (jobId) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/milestones?achievedOnly=false&page=0&pageSize=10
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/milestones';
      return api().get(url, {
        params: { 'achievedOnly': true, page: 0, 'page-size': 10, }
      })
    }
  },
  process: {
    byCorrelationKey: (correlationKey) => {
      return api().get('/services/rest/server/queries/processes/instance/correlation/' + correlationKey)
    },
    image: (id) => {
      if (id > 0) {
        return api().get(
          '/services/rest/server/containers/hr-hiring/images/processes/instances/' + id,
          {
            headers: {
              Accept: 'application/svg+xml',
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('kcTokens') || '{}').token
            }
          })
      }
      else { return undefined };
    },
  },
  tasks: {
    complete: (id, output) => api().put(
      'services/rest/server/containers/hr-hiring/tasks/' + id + '/states/completed',
      output,
      {
        params: {
          'auto-progress': true,
        }
      }
    ),
    detail: (id) => api().get('services/rest/server/containers/hr-hiring/tasks/' + id + '/contents/input'),
    listMine: (page, pageSize) => api().get(
      'services/rest/server/queries/tasks/instances/owners', {
        params: {
          page,
          pageSize,
        }
      })
  }
}