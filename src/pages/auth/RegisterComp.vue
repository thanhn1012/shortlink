<template>
    <div>
        <q-page padding class="flex flex-center">
            <div  style="width: 400px">
                <q-card>
                    <q-toolbar class="bg-primary text-white text-center">
                        <q-toolbar-title>
                            Register
                        </q-toolbar-title>
                    </q-toolbar>
                    <q-card-section >
                        <q-form
                            @submit="registerHandle"
                            class="q-gutter-md"
                        >
                            <q-input rounded outlined v-model="formData.username" label="Username" class="with" autofocus/>
                            <q-input rounded outlined v-model="formData.email" label="Email" class="with"
                            :rules="[
                                validateEmail
                            ]"/>
                            <q-input rounded outlined v-model="formData.password" label="Password" :type="isPwd ? 'password' : 'text'">
                                <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                                </template>
                            </q-input>
                            <q-card-actions>
                                <q-btn size="18px" rounded label="Login" class="full-width bg-primary text-white" @click="registerHandle" />
                            </q-card-actions>
                        </q-form>
                    </q-card-section>
                    <q-card-section >
                        <router-link to="/login">Login</router-link>
                    </q-card-section>
                </q-card>
            </div>
        </q-page>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { api } from 'src/boot/axios';
    import { useRouter } from 'vue-router';
    import { useQuasar } from 'quasar'
    const router = useRouter();
    const $q = useQuasar()
    const isLoading = ref(false);

    const isPwd = ref(true);
    const formData = reactive({
        username: '',
        email: '',
        password: '',
    })

    const validateEmail = (input) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(input) || 'Email is not valid';
    }
    
    const registerHandle = async () => {
        try {
            if (isLoading.value) return;
            isLoading.value = true;
            $q.loadingBar.start()
            const res = await api.post('/api/auth/local/register', formData)
            if(res.status === 200) {
                $q.loadingBar.stop()
                isLoading.value = false;
                router.push('/login')
            }
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    }

</script>