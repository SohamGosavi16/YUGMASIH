Add-Type -AssemblyName System.Speech
$syn = New-Object System.Speech.Synthesis.SpeechSynthesizer
$syn.Speak('Voice guide speech test')
Write-Output "SPEECH COMPLETED"
