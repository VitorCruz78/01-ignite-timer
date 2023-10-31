import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidateSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidateSchema>

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <div>
                        <label htmlFor="task">Vou trabalhar em</label>
                        <TaskInput
                            id="task"
                            list='task-suggestions'
                            placeholder='Dê um nome para o seu projeto'
                            {...register('task')}
                        />

                        <datalist id='task-suggestions'>
                            <option value="Projeto 1" />
                            <option value="Projeto 3" />
                            <option value="Projeto 2" />
                            <option value="Sim" />
                        </datalist>

                        <label htmlFor="minutesAmount">durante</label>
                        <MinutesAmountInput
                            type="number"
                            id="minutesAmount"
                            placeholder='00'
                            step={5}
                            min={5}
                            max={60}
                            {...register('minutesAmount', { valueAsNumber: true })}
                        />
                        <span>Minutos.</span>
                    </div>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}
