<template>
    <div>
        <q-page padding class="flex flex-center">
            <div  style="width: 400px">
                <q-card>
                    <q-toolbar class="bg-primary text-white text-center">
                        <q-toolbar-title>
                            Login
                        </q-toolbar-title>
                    </q-toolbar>
                    <q-card-section >
                        <q-form
                            @submit="loginHandle"
                            class="q-gutter-md"
                        >
                            <q-input rounded outlined v-model="formData.identifier" label="Username" class="with" 
                            :rules="[
                                (val) => !!val || 'Username is required',
                            ]"/>
                            <q-input rounded outlined v-model="formData.password"  label="Password" :type="isPwd ? 'password' : 'text'">
                                <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                                </template>
                            </q-input>
                            <q-card-actions>
                                <q-btn size="18px" rounded label="Login" class="full-width bg-primary text-white" @click="loginHandle" />
                            </q-card-actions>
                        </q-form>
                    </q-card-section>
                    <q-card-section >
                        <router-link to="/register">Register</router-link>
                    </q-card-section>
                </q-card>
            </div>
        </q-page>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useQuasar } from 'quasar'
    import { api } from 'src/boot/axios';
    const router = useRouter();
    const $q = useQuasar()
    const isLoading = ref(false);

    const isPwd = ref(true);
    const formData = reactive({
        identifier: '',
        password: '',
    })

    const validateEmail = (input) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(input) || 'Email is not valid';

    }
    const loginHandle = async () => {
        try {
            if (isLoading.value) return;
            isLoading.value = true;
            $q.loadingBar.start()
            const res = await api.post('/api/auth/local', formData)
            if(res.status === 200) {
                $q.loadingBar.stop()
                isLoading.value = false;
                router.push('/')
            }
        } catch (error) {
            isLoading.value = false;
            $q.notify({
                message: 'Login failed',
                color: 'red'
            })
        }
    }

</script>

<style lang="scss" scoped>

</style>