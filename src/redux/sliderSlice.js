import { createSlice } from "@reduxjs/toolkit";
import { sliderActions } from "./sliderActions";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllSlider: [],
    dataSlider: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(sliderActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sliderActions.getAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataAllSlider = payload;
      })
      .addCase(sliderActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(sliderActions.create.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sliderActions.create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        const prevDataAllSlider = state.dataAllSlider;
        state.dataAllSlider = [...prevDataAllSlider, payload];
      })
      .addCase(sliderActions.create.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(sliderActions.getSingle.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sliderActions.getSingle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // const prevDataAllSlider = state.dataAllSlider;
        state.dataSlider = payload;
      })
      .addCase(sliderActions.getSingle.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(sliderActions.update.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sliderActions.update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const prevDataAllSlider = state.dataAllSlider;
        const updatedUserList = prevDataAllSlider.map((category) => {
          if (category.categoryId === payload.categoryId) {
            return payload;
          } else {
            return category;
          }
        });

        // console.log("updatedUserList", updatedUserList);
        state.dataAllSlider = updatedUserList;
      })
      .addCase(sliderActions.update.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      });
  },
});

export const selectLoading = (state) => state.slider.loading;
export const selectSuccess = (state) => state.slider.success;
export const selectError = (state) => state.slider.error;
export const selectDataSlider = (state) => state.slider.dataSlider;

export default sliderSlice.reducer;
