import api from "../../api.js";

export default {
    actions:{
        async uploadPicture({ commit }, formData) {
            const res = await api.post(
                `${import.meta.env.VITE_URL}/files/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            const result = await res.data
            return result.data.filename
        },
        async removePicture({ commit }, fileName) {
            const res = await api.post(
                `${import.meta.env.VITE_URL}/files/remove/`,
                {
                    imageName: fileName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            await res.data
        },
        async getPicture({ commit }, fileName) {
            const res = await api.get(
                `${import.meta.env.VITE_URL}/products/files/${fileName}`
            )
            return await res.data
        },
    },
}
