import { type ReactNode } from 'react'
import {
  CreateButton,
  ExportButton,
  FilterButton,
  SelectColumnsButton,
  TopToolbar,
  type CreateButtonProps,
  type ExportButtonProps,
  type FilterButtonProps,
  type SelectColumnsButtonProps,
  type ToolbarProps,
} from 'react-admin'

type DefaultListActionsProps = {
  children?: ReactNode
  toolbarProps?: ToolbarProps
  selectColumnsButtonProps?: SelectColumnsButtonProps
  filterButtonProps?: FilterButtonProps
  createButtonProps?: CreateButtonProps
  exportButtonProps?: ExportButtonProps
}

export const DefaultListActions = ({
  children,
  toolbarProps,
  selectColumnsButtonProps,
  filterButtonProps,
  createButtonProps,
  exportButtonProps,
}: DefaultListActionsProps) => (
  <>
    <TopToolbar {...toolbarProps}>
      <SelectColumnsButton {...selectColumnsButtonProps} />
      <FilterButton {...filterButtonProps} />
      <CreateButton {...createButtonProps} />
      {children}
      <ExportButton {...exportButtonProps} />
    </TopToolbar>
  </>
)
