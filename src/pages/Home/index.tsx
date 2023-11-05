import { useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from '../components/NewCycleForm'
import { Countdown } from '../components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidateSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidateSchema>

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {
                    activeCycle ? <>
                        <StopCountdownButton
                            onClick={interruptCurrentCycle}
                            type="button">
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    </> : <>
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    </>
                }
            </form>
        </HomeContainer>
    )
}
