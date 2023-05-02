import { http } from "../plugins/http_service";

export default class Model {
    constructor(url) {
        this.url = url;
        this.data = null;
        this.loading = false;
        this.isError = false;
        this.error = null;
    }

    async get(payload, customURL) {
        this.loading = true;
        await http()
            .get(customURL ? customURL : this.url, { params: payload })
            .then((response) => {
                this.data = response.data;
            })
            .catch((error) => {
                this.isError = true;
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });

        return {
            loading: this.loading,
            data: this.data,
            isError: this.isError,
            error: this.error,
        };
    }

    async post(payload, customURL) {
        this.loading = true;
        await http()
            .post(customURL ? customURL : this.url, payload)
            .then((response) => {
                this.data = response.data;
            })
            .catch((error) => {
                this.isError = true;
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });

        return {
            loading: this.loading,
            data: this.data,
            isError: this.isError,
            error: this.error,
        };
    }

    async put(payload, customURL) {
        this.loading = true;
        await http()
            .put(customURL ? customURL : this.url, payload)
            .then((response) => {
                this.data = response.data;
            })
            .catch((error) => {
                this.isError = true;
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });

        return {
            loading: this.loading,
            data: this.data,
            isError: this.isError,
            error: this.error,
        };
    }

    async update(payload, customURL) {
        this.loading = true;
        await http()
            .post(customURL ? customURL : this.url, payload)
            .then((response) => {
                this.data = response.data;
            })
            .catch((error) => {
                this.isError = true;
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });

        return {
            loading: this.loading,
            data: this.data,
            isError: this.isError,
            error: this.error,
        };
    }

    async destroy(customURL) {
        this.loading = true;
        await http()
            .delete(customURL ? customURL : this.url)
            .then((response) => {
                this.data = response.data;
            })
            .catch((error) => {
                this.isError = true;
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });

        return {
            loading: this.loading,
            data: this.data,
            isError: this.isError,
            error: this.error,
        };
    }
}
