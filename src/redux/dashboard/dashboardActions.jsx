import {
  FETCH_DASHBOARD_PENDING,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from "./dashboardTypes";
import { supabase } from "../../supabaseClient";

export const fetchDashboardData = (userEmail) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_PENDING });

    try {
      const [userRes, cryptosRes, purchasesRes, rewardsRes] = await Promise.all(
        [
          supabase.from("users").select("*").eq("email", userEmail).single(),
          supabase.from("cryptos").select("*"),
          supabase
            .from("purchase_history")
            .select("*")
            .eq("user_email", userEmail),
          supabase
            .from("reward_history")
            .select("*")
            .eq("user_email", userEmail),
        ]
      );

      if (
        userRes.error ||
        cryptosRes.error ||
        purchasesRes.error ||
        rewardsRes.error
      ) {
        throw new Error(
          userRes.error?.message ||
            cryptosRes.error?.message ||
            purchasesRes.error?.message ||
            rewardsRes.error?.message
        );
      }

      dispatch({
        type: FETCH_DASHBOARD_SUCCESS,
        payload: {
          user: userRes.data,
          cryptos: cryptosRes.data,
          purchaseHistory: purchasesRes.data,
          rewardHistory: rewardsRes.data,
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_DASHBOARD_FAILURE, payload: error.message });
    }
  };
};
