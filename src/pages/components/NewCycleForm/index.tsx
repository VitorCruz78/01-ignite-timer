import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from 'react';
import { CyclesContext } from '../../Home';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <div>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput
                    id="task"
                    list='task-suggestions'
                    placeholder='Dê um nome para o seu projeto'
                    disabled={!!activeCycle}
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
                    disabled={!!activeCycle}
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', { valueAsNumber: true })}
                />
                <span>Minutos.</span>
            </div>
        </FormContainer>
    )
}