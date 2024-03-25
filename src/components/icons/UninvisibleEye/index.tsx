import Svg, {
  Path,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from "react-native-svg";

function UninvisibleEye(props: SvgProps) {
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" {...props}>
      <Path fill="url(#pattern0)" d="M0 0H23V23H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_214_142" transform="scale(.01042)" />
        </Pattern>
        <Image
          id="image0_214_142"
          width={96}
          height={96}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFZ0lEQVR4nO2da4hWRRjHf7663cgUu+1GUqndLSu7F37IEgv0Q2AUgRUJKSF+MAoL6WtQEQSWdjdBK4sSSdMIIjL6EN2gLCJwM13LykptN0tPDM3CYdldZ848c+ac9zx/eD7t7nv+M/93zjy3mQWFQqFQKBQKhUKhUCgUbrgeOF0nKw1mAL1ANzAxEQeaPvmZtR9UhHSTnxdhUok8GomhJr/feoBzU5Ns6uTnRTgvNdkmC2Bsl4pQDRHOj8Sj0fAR4SdgcmrC7QgVoYYiXJCacDtiZkkijAIuAe4CHgVeAbYAnwHfA1uBj4F37M8eAW4FzgFG0ubwEeFn4ELHz+0EFgIbgb2Onz+Y7Qc2AAuA8bQpfETYDUwZ4nPGAHcCm4F/AyZ9OPsEmA+MpsEi/AJclPvbU4DHAr/pvvYHsAw4m4aK8CswG1gB9JU48QPNrLSXgDNooAhZhewA8BQwjoa5qFnFzKzMRUCLmqOuKyGz9n47vJakRdgPvAssBW4Gptmkn6lDTAVmAYuB12zcIbFR30HNISHCR8BtwJEezzUB2HRgDfBP4PNfrbvbWlSEL4FrBZ4/AXg9UISvbWTdGBGeAzqEOcy2gWDIK8m85hoTrE2JwOE04KvAuGEeDcodTY7Awfj6XwSIcAhYQoXQsjmcVgQRdkUq9HfaTo6QfeEJYASJYSb9RUvo+Ugi7ATOisD9agEPaVWEvcoZLZtHyROKJcKPgzR/GVfzZOCEgDE8HihAZmsQpdcdzCSvHIJQLBG6bXR6HfAm8GfuZ702jX235zdydKBn1G/PlP06evIwhGKJ0OfwO98C13iMZamAAJmt1pWC+x0JxRIhcxTqFo8NWaoA9BCRcbt1w7KaiHCl47M3Cz3zkK1HR4GpYv1VgNQLHiLMEBbhG1vUl1rVLmb4X44wjge2BZBKuRLmOrqkmaDtALoQQst2J4SSSrUS1jtGx1mEmoKIezpfkFSKlbDX8Xn7IohwDwL4XJhUChHGOjyrJ4IApnksGN0RiBkRKFEE42qmEMDsm8FYEYFY5lllmhkgQp9DdDzCdkZIj3E5AugSCtcH2gRPHkVF+MDhs8dEGN9uSU/oJuCgMMEbC/AoIoLJDx0OFwuP7WDB8Q2LJcIkHyzIw1cEl67shcJje5hIWCVI8r0AHj5xgssR2rWC41oTMzN6FPChENEDwIkBXHxWwvZhijrHAr8LBl9HEBljrX8rQXhxIBffytpgrSULhMaytcze0pNsoiuU9HbPhiuJGnP+9ObIwC6J/DhKb2UcH5igy6yZTGSqkzqLhBJvZ5IIkwS6C/YJ3TPh23c0a0BZs4j1VKFjzjQ7fRc4kE+Bo2vWlb0t5Td/ILoCm50yYJ1j8aQKIpgN91QqhuMESnvrarAStgS6z1Fhkl7PCpxknFhREVYKeG2lwBRx/g4sotwn0HUmJYLJ7TxAzXCV9Y9DN7p7HQsqsUQwAdwN1BTj7JGh0G9gL/CWFeMy4JiSRNhgg87aY65gviXLHZhYHrG8uawK3c+SMGXBlz0buzLH7OOoCFnUPcCltCGmWz86E7TVHiJU4aROcpjXxhyBCDpvaz28Jp+V8Js9BtuW6LC9M1Ir4g0PEXwTeG1/6dRU24ER6re/bQtH0iuhESL0u65z7Ia9p6AIGyOK0KiLCDuAK+xr6ml7an7nEF3avTY1vskeoDPXnMUq6ujltPyfk+m05vptlxJBr2muyG2QuhIiQK9prqEIemt8YhF0T6iACCb1rv/EogIi6P/UiQDfXlQVoQIi+J5/UAgHa+bWL0WilbBJKDpXFBBBJz+hCDr5CUXQyU+4MZuWGX3nKxQKhUKhUCgUClzwHxGTNEPFgA3JAAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
}

export default UninvisibleEye;
