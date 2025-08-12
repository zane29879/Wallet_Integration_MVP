import {
  SET_PAYMENT_METHOD_1,
  SET_PAYMENT_DETAILS,
  RESET_CHECKOUT,
  SET_CARDS,
  SELECT_CARD,
  SET_BANKS,
  SELECT_BANK,
  FETCHING_START,
  FETCHING_SUCCESS,
  FETCHING_FAIL,
  INSERT_CB_START,
  INSERT_CB_SUCCESS,
  INSERT_CB_FAIL,
} from "./checkoutTypes";

import { supabase } from "../../supabaseClient";

// Synchronous actions
export const setPaymentMethod_1 = (method) => {
  sessionStorage.setItem("method_1", method);
  return { type: SET_PAYMENT_METHOD_1, payload: method };
};

export const setPaymentDetails = (details) => ({
  type: SET_PAYMENT_DETAILS,
  payload: details,
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
});

// fetch payment summary data
export const fetchCheckoutData = (method) => async (dispatch) => {
  try {
    // Fetch the goods data (assume static item: 'membership_1month')
    const { data: goods, error: goodsError } = await supabase
      .from("goods")
      .select("*")
      .eq("payment_method", method)
      .single();

    if (goodsError) throw goodsError;

    let details = {};

    // Dispatch to store
    if (method === "crypto") {
      const { data: cryptos, error: cryptosError } = await supabase
        .from("cryptos")
        .select("*")
        .eq("type", "ETH")
        .single();
      if (cryptosError) throw cryptosError;
      details = {
        item: goods.name,
        usdPrice: null,
        cryptoPrice: goods.price,
        discount: goods.discount,
        rate: cryptos.price,
        merchant_name: goods.merchant,
      };
    } else {
      details = {
        item: goods.name,
        usdPrice: goods.price,
        discount: goods.discount,
        rate: null,
        merchant_name: goods.merchant,
        cryptoPrice: null,
      };
    }
    dispatch(setPaymentDetails(details));
  } catch (error) {
    console.error("Error fetching checkout data:", error.message);
    // Optionally dispatch an error action here
  }
};

const isValidUUID = (str) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const fetchCardAndBankData = (holder_id) => async (dispatch) => {
  dispatch({ type: FETCHING_START });
  try {
    if (isValidUUID(holder_id)) {
      const [cardList, bankList] = await Promise.all([
        supabase.from("cards").select("*").eq("holder_id", holder_id),
        supabase.from("banks").select("*").eq("holder_id", holder_id),
      ]);

      if (cardList.error || bankList.error) {
        throw new Error(cardList.error?.message || bankList.error?.message);
      }

      dispatch({
        type: FETCHING_SUCCESS,
        payload: {
          cards: cardList.data,
          banks: bankList.data,
        },
      });
    } else {
      throw new Error("Id is not correct.");
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAIL, payload: error.message });
    console.error("Fetching card and bank list error:", error.message);
    alert("Error fetching card and bank list. Please try again.");
    throw error;
  }
};

export const saveNewCard = (card) => async (dispatch) => {
  dispatch({ type: INSERT_CB_START });
  try {
    const { data, error } = await supabase
      .from("cards")
      .insert([{ ...card }])
      .select();
    if (error) {
      throw new Error(error?.message);
    }
    dispatch(setCardList(data));
    dispatch({ type: INSERT_CB_SUCCESS });
  } catch (error) {
    dispatch({ type: INSERT_CB_FAIL, payload: error.message });
    console.error("Saving new card info error:", error.message);
    alert("Error saving card info. Please try again.");
    throw error;
  }
};

export const saveNewBank = (bank) => async (dispatch) => {
  dispatch({ type: INSERT_CB_START });
  console.log(bank);
  try {
    const { data, error } = await supabase
      .from("banks")
      .insert([{ ...bank }])
      .select();
    if (error) {
      throw new Error(error?.message);
    }
    console.log(data);
    dispatch(setBankList(data));
    dispatch({ type: INSERT_CB_SUCCESS });
  } catch (error) {
    dispatch({ type: INSERT_CB_FAIL, payload: error.message });
    console.error("Saving new bank info error:", error.message);
    alert("Error saving bank info. Please try again.");
    throw error;
  }
};

export const setCardList = (cards) => ({
  type: SET_CARDS,
  payload: cards,
});

export const setBankList = (banks) => ({
  type: SET_BANKS,
  payload: banks,
});

export const selectCard = (card) => ({ type: SELECT_CARD, payload: card });
export const selectBank = (bank) => ({ type: SELECT_BANK, payload: bank });
