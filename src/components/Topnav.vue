<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useModal } from '@/composables/useModal';
import { useDomain } from '@/composables/useDomain';
import { useApp } from '@/composables/useApp';
// import { useWeb3 } from '@/composables/useWeb3';
import { useTxStatus } from '@/composables/useTxStatus';
import { useUserSkin } from '@/composables/useUserSkin';
import { useClient } from '@/composables/useClient';
import { useStore } from 'vuex';
import UP from 'up-core-test';
UP.config({
  domain: 't.app.unipass.id', // UniPass ID domain (test)
  protocol: 'https' // Protocol of URLs, default https
});

const { pendingCount } = useTxStatus();
const { modalAccountOpen } = useModal();
const { env, domain } = useDomain();
const route = useRoute();
const store = useStore();

const { explore } = useApp();
// const { login, web3 } = useWeb3();
const { toggleSkin, getSkinIcon } = useUserSkin();
const { isGnosisSafe } = useClient();

const loading = ref(false);
const modalNotice = ref(false);

const space = computed(() => {
  const key = domain || route.params.key;
  return explore.value.space?.[key];
});

function setTitle() {
  document.title = space.value?.name ?? 'Quadratic';
}

async function login() {
  loading.value = true;
  const upid = await UP.connect({
    email: true,
    evmKeys: true
  });

  console.log(upid);

  if (!upid.evmKeys) {
    console.log(`User rejected the request for evm keys or doesn't have any`);
  }
  store.commit('setUpId', upid);
  loading.value = false;
  return upid;
}

async function logout() {
  store.commit('reset');
}

async function handleLogin(connector) {
  modalAccountOpen.value = false;
  loading.value = true;
  await login(connector);
  loading.value = false;
}

watch(space, () => {
  setTitle();
});

watch(isGnosisSafe, () => {
  if (isGnosisSafe.value) modalNotice.value = true;
});

onMounted(() => setTitle());
</script>

<template>
  <Sticky class="mb-4">
    <div
      v-if="env === 'develop'"
      class="p-3 text-center bg-blue"
      style="color: white; font-size: 20px"
    >
      {{ $t('demoSite') }}
    </div>
    <nav id="topnav" class="border-b w-full bg-black">
      <Container>
        <div class="flex items-center" style="height: 78px">
          <div class="flex-auto flex items-center">
            <router-link
              :to="{ path: '/' }"
              class="flex items-center"
              style="font-size: 24px; padding-top: 4px"
            >
              Quadratic
            </router-link>
          </div>
          <div>
            <template v-if="store.state.status">
              <UiButton @click="logout()" class="flex items-center float-left">
                <UiAvatar
                  :address="store.state.upid?.evmKeys[0] || ''"
                  size="18"
                  class="-mr-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2 -ml-1"
                />
                <span
                  v-text="store.state.upid?.username"
                  class="hidden sm:block"
                />
              </UiButton>
            </template>
            <UiButton
              v-if="!store.state.status"
              @click="login()"
              :loading="loading"
            >
              <span class="hidden sm:block" v-text="$t('connectWallet')" />
              <Icon
                name="login"
                size="20"
                class="sm:hidden -ml-2 -mr-2 block align-text-bottom"
              />
            </UiButton>
            <UiSidebarButton
              v-if="!domain"
              @click="toggleSkin"
              class="float-right ml-2"
            >
              <Icon size="20" class="link-color" :name="getSkinIcon()" />
            </UiSidebarButton>
          </div>
        </div>
      </Container>
    </nav>
    <div class="bg-blue text-white text-center py-2" v-if="pendingCount > 0">
      <UiLoading :fill-white="true" class="mr-2" />
      {{ $tc('delegate.pendingTransaction', pendingCount) }}
    </div>
    <teleport to="#modal">
      <ModalAccount
        :open="modalAccountOpen"
        @close="modalAccountOpen = false"
        @login="handleLogin"
      />
      <ModalNotice
        :open="modalNotice"
        :title="$t('walletNotice')"
        @close="modalNotice = false"
      >
        <h4 class="mb-3">{{ $t('gnosisSafeWalletNotice') }}</h4>
        <a
          @click="$router.push({ name: 'delegate' }), (modalNotice = false)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center"
        >
          <UiText class="mt-1" :text="$t('delegateVotingPower')" />
        </a>
      </ModalNotice>
    </teleport>
  </Sticky>
</template>
