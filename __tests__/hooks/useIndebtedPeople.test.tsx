import { renderHook, act } from '@testing-library/react'
import { useIndebtedPeople } from '@/shared/hooks/useIndebtedPeople'

describe('useIndebtedPeople', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    expect(result.current.indebtedPeople).toEqual([])
    expect(result.current.indebtedPeopleUI).toEqual([])
    expect(result.current.editPerson).toBeNull()
    expect(result.current.openIndebtedPeopleModal).toBe(false)
  })

  it('should add a new indebted person', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    act(() => {
      result.current.addIndebtedPerson({
        name: 'John Doe',
        amount: 100,
        amountPaid: 50,
        isPaid: false
      })
    })

    expect(result.current.indebtedPeople).toHaveLength(1)
    expect(result.current.indebtedPeople[0]).toEqual({
      name: 'John Doe',
      amount: 100,
      amountPaid: 50,
      isPaid: false
    })
  })

  it('should remove an indebted person', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    act(() => {
      result.current.addIndebtedPerson({
        name: 'John Doe',
        amount: 100,
        amountPaid: 50,
        isPaid: false
      })
    })

    act(() => {
      result.current.removePerson('John Doe')
    })

    expect(result.current.indebtedPeople).toHaveLength(0)
  })

  it('should validate if a person exists', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    act(() => {
      result.current.addIndebtedPerson({
        name: 'John Doe',
        amount: 100,
        amountPaid: 50,
        isPaid: false
      })
    })

    expect(result.current.validatePersonExist('John Doe')).toBe(true)
    expect(result.current.validatePersonExist('Jane Doe')).toBe(false)
  })

  it('should update an existing indebted person', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    act(() => {
      result.current.addIndebtedPerson({
        name: 'John Doe',
        amount: 100,
        amountPaid: 50,
        isPaid: false
      })
    })

    act(() => {
      result.current.updateIndebtedPerson({
        name: 'John Doe',
        amount: 200,
        amountPaid: 100,
        isPaid: true,
      })
    })

    expect(result.current.indebtedPeople[0]).toEqual({
      name: 'John Doe',
      amount: 200,
      amountPaid: 100,
      isPaid: true
    })
    expect(result.current.indebtedPeople.length).toBe(1)
    expect(result.current.indebtedPeopleUI.length).toBe(1)
  })

  it('should toggle the modal state', () => {
    const { result } = renderHook(() => useIndebtedPeople())

    act(() => {
      result.current.toggleIndebtedPeopleModal()
    })

    expect(result.current.openIndebtedPeopleModal).toBe(true)

    act(() => {
      result.current.toggleIndebtedPeopleModal()
    })

    expect(result.current.openIndebtedPeopleModal).toBe(false)
  })
})