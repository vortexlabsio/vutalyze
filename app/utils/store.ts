import create from 'zustand'
import { persist, combine } from 'zustand/middleware'

export const useStore = create(
	persist(
		combine(
			{
				showMobilePanel: false,
				showDetailPanel: false,
			},
			set => ({
				toggleMobilePanel: () =>
					set(state => ({
						showMobilePanel: !state.showMobilePanel,
					})),
				toggleDetailPanel: () =>
					set(state => ({
						showDetailPanel: !state.showDetailPanel,
					})),
			}),
		),
		{
			name: 'vutalyze',
			getStorage: () => localStorage,
		},
	),
)

export default useStore
