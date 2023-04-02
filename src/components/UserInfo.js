export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._profileName.textContext,
            job: this._profileJob.textContext
        }
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._profileName.textContent = userInfo.name;
        this._profileJob.textContent = userInfo.job;
    }
}