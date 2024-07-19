import { buttonStyles } from '@/utils/constants'
import { Select } from '@radix-ui/themes'
import React from 'react'

export default function AssignSelect() {
  return (
    <Select.Root size='3'>
      <Select.Trigger
        placeholder='Assign Issue'
        style={buttonStyles}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='1'>Ismail Bardach</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
