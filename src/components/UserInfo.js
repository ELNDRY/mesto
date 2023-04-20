export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
        }
        return userInfo;
    }

    getUserId() {
        return this._id
    }

    setUserAvatar(userInfo) {
        this._profileAvatar.src = userInfo.avatar;
        this._profileAvatar.alt = `Фотография: ${this._profileName.textContent}.`;
    }

    setUserInfo(userInfo) {
        this._profileName.textContent = userInfo.name;
        this._profileJob.textContent = userInfo.about;
        this._id = userInfo._id;
    }
}