import api from './axiosInstance';

const studyGroupAPI = {
  getGroupById: () => {
    const url = '/group/get-groups';
    return api.get(url);
  },
  createGroup: body => {
    const url = '/group/create-study-group';
    return api.post(url, body);
  },
  addMemberToGroup: (groupId, body) => {
    const url = `/group/add-members/${groupId}`;
    return api.post(url, body);
  }
};

export default studyGroupAPI;
