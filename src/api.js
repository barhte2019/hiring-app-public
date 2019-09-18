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
  applications: {
    list: (page, pageSize) => api().get(
      'services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.hiring-case-definition/instances',
      {
        params: {
          page,
          'page_size': pageSize
        }
      }
    ),
  },
  cases: {
    caseDetail: (caseId) => {
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + caseId;
      return api().get(url);
    },
    caseFile: (caseId) => {
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + caseId + '/caseFile';
      return api().get(url);
    },
    milestones: (caseId) => {
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + caseId + '/milestones';
      return api().get(url, {
        params: { 'achievedOnly': true, page: 0, 'page-size': 10, }
      })
    }
  },
  jobs: {
    apply: (caseData, jobOwner, applicant) => {
      return api().post(
        '/services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.hiring-case-definition/instances',
        {
          "case-data": {
            ...caseData
          },
          "case-group-assignments": {
            "benefits-compensation": "talent-acquisition",
            "talent-acquisition": "talent-acquisition"
          },
          "case-user-assignments": { "owner": applicant, "job_request_manager": jobOwner },
        }
      );
    },
    list: (page, pageSize) => api().get(
      'services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.job-vacancy-lifecycle/instances',
      {
        params: {
          page,
          'page_size': pageSize
        }
      }
    )
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
    signal: (id, signalName, data) => {
      return api().post(
        '/services/rest/server/containers/hr-hiring/processes/instances/signal/' + signalName,
        data
      )
    }
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