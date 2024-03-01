import { render } from "@testing-library/react"
import { Pagination } from "./pagination"
import { userEvent } from '@testing-library/user-event'

const onPageChangeCallBack = vi.fn()

describe('Pagination', () => {
  it('should diplay the rigth amount of pages an results', () => {

    const wrapper = render(<Pagination pageIndex={0} totalCount={200} perPage={10} onPageChange={() => { }} />)

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()


  })

  it('should diplay the rigth amount of pages an results', async () => {


    const user = userEvent.setup()
    const wrapper = render(<Pagination pageIndex={0} totalCount={200} perPage={10} onPageChange={onPageChangeCallBack} />)

    // procurando por um botão que tem o texto Próxima página
    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página'
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallBack).toHaveBeenCalledWith(1);


  })
})