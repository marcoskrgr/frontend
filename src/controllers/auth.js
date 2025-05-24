import { useState } from "react";
import { AuthRepository } from "@repositories/auth";
import { useToast } from "@components/common/Toast/ToastProvider";
import { useAuthStore } from "@stores/useAuth";

export function createAuthController() {
  const [loading, setLoading] = useState(false);
  const authRepository = AuthRepository();
  const { addToast } = useToast();

  const setToken = useAuthStore((state) => state.setToken);
  const setTemporaryToken = useAuthStore((state) => state.setTemporaryToken);
  const getTemporaryToken = useAuthStore((state) => state.temporaryToken);
  const setIsPhoneConfirmed = useAuthStore((state) => state.setIsPhoneConfirmed);

  async function login(data) {
    try {
      setLoading(true);
      const userData = await authRepository.login(data);
      setToken(userData.token);
      setIsPhoneConfirmed(true);
      return userData;
    } catch (e) {
      addToast(e.response?.data?.error || e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function register(data) {
    try {
      setLoading(true);
      const response = await authRepository.register(data);
      setTemporaryToken(response.token);
      return true;
    } catch (e) {
      console.error(e);
      addToast(e.response?.data?.error || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function insertPhone(data) {
    try {
      setLoading(true);
      await authRepository.insertPhone(data, getTemporaryToken);
      return true;
    } catch (e) {
      console.error(e);
      addToast(e.response?.data?.error || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function confirmPhone(data) {
    try {
      setLoading(true);
      const response = await authRepository.confirmPhone(data, getTemporaryToken);
			setIsPhoneConfirmed(true);
      setToken(response.data.token);
      return true;
    } catch (e) {
      console.error(e);
      addToast(e.response?.data?.error || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    register,
    confirmPhone,
    insertPhone,
    loading,
  };
}
