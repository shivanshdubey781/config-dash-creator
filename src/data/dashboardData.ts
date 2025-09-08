import { DashboardData } from '../types/dashboard';

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: 'cnapp',
      name: 'CNAPP Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2)\nNot Connected (2)',
          type: 'chart'
        }
      ]
    },
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)',
          type: 'chart'
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'alert'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'alert'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities\nCritical (9)\nHigh (150)',
          type: 'stat'
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images\nCritical (2)\nHigh (2)',
          type: 'stat'
        }
      ]
    }
  ]
};