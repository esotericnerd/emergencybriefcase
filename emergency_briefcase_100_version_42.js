const LOCAL_STORAGE_VERSION = '1.0';

function initializeArrays() {
    try {
        // Get stored version
        const storedVersion = localStorage.getItem('dataVersion');
        
        // If version mismatch, clear storage
        if (storedVersion !== LOCAL_STORAGE_VERSION) {
            localStorage.clear();
            localStorage.setItem('dataVersion', LOCAL_STORAGE_VERSION);
        }

        // Initialize with default data only if no stored data exists
        const storedCases = localStorage.getItem('customCases');
        const storedFlashcards = localStorage.getItem('customFlashcards');

        if (storedCases) {
            window.allCases = JSON.parse(storedCases);
        } else {
            // Initialize with default cases
            window.allCases = [
                // ... default cases here ...
            ];
            syncLocalStorage();
        }

        if (storedFlashcards) {
            window.flashcards = JSON.parse(storedFlashcards);
        } else {
            // Initialize with default flashcards
            window.flashcards = [
                // ... default flashcards here ...
            ];
            syncLocalStorage();
        }
    } catch (error) {
        console.error('Error initializing data:', error);
        // Fallback to defaults if localStorage fails
        window.allCases = [];
        window.flashcards = [];
    }
}

function syncLocalStorage() {
    try {
        localStorage.setItem('customCases', JSON.stringify(allCases));
        localStorage.setItem('customFlashcards', JSON.stringify(flashcards));
        localStorage.setItem('dataVersion', LOCAL_STORAGE_VERSION);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Failed to save changes. Please check your browser storage settings.');
    }
}

// Modify DOMContentLoaded event listener:
document.addEventListener('DOMContentLoaded', function() {
    initializeArrays();
    updateReviewButton();
    updateFilterButtons();
    updateSpecialtyDropdown();
    updateFlashcardCategoryDropdown();
    displayCurrentCase();
});
function syncLocalStorage() {
    localStorage.setItem('customCases', JSON.stringify(allCases));
    localStorage.setItem('customFlashcards', JSON.stringify(flashcards));
}

// Modify the deleteFlashcard function:
function deleteFlashcard(index) {
    if (confirm('Are you sure you want to delete this flashcard?')) {
        flashcards.splice(index, 1);
        syncLocalStorage(); // Add this line
        updateContentManagement();
        alert('Flashcard deleted successfully!');
    }
}

// Modify the deleteCase function:
function deleteCase(index) {
    if (confirm('Are you sure you want to delete this case?')) {
        allCases.splice(index, 1);
        incorrectCases = incorrectCases.filter(i => i !== index).map(i => i > index ? i - 1 : i);
        syncLocalStorage(); // Add this line
        updateContentManagement();
        updateFilterButtons();
        alert('Case deleted successfully!');
    }
}

// Modify the saveFlashcard function to replace the localStorage code with:
function saveFlashcard() {
    // ... existing validation and flashcard creation code ...
    
    if (editingFlashcardIndex >= 0) {
        flashcards[editingFlashcardIndex] = newFlashcard;
        editingFlashcardIndex = -1;
        alert('Flashcard updated successfully!');
    } else {
        flashcards.push(newFlashcard);
        alert('Flashcard added successfully!');
    }
    
    syncLocalStorage(); // Add this line
    clearFlashcardForm();
    updateContentManagement();
}
document.addEventListener('DOMContentLoaded', function() {
// 100 Emergency Medicine Cases

// Load saved cases and flashcards from localStorage
const savedCases = JSON.parse(localStorage.getItem('customCases') || '[]');
const savedFlashcards = JSON.parse(localStorage.getItem('customFlashcards') || '[]');

allCases.push(...savedCases);
flashcards.push(...savedFlashcards);

        const allCases = [
            // Cardiology Cases (10)
            { category: 'Emergency Cardiology - STEMI', urgency: 'high', presentation: '67M crushing chest pain radiating to left arm x45 min. Diaphoretic, nauseous. PMH: HTN, DM, smoking 2ppd x30 years.', vitals: 'BP: 160/95, HR: 102, RR: 22, O2: 96%, Temp: 98.6°F', question: 'EKG shows 4mm ST elevation V1-V4. Door time 15min. ED priority?', options: ['Thrombolytics in ED', 'Activate cath lab for primary PCI', 'Medical management only', 'Emergent CABG consult'], correct: 1, explanation: 'Emergency activation of cath lab for primary PCI. Door-to-balloon goal <90min for STEMI patients.' },
            
            { category: 'Emergency Cardiology - Heart Failure', urgency: 'high', presentation: '58F acute SOB, unable to lie flat, bilateral crackles to apices, cool extremities, altered mental status. Known ischemic cardiomyopathy.', vitals: 'BP: 85/60, HR: 110, RR: 28, O2: 85%, BNP: 3500', question: 'Immediate ED management for cardiogenic shock with pulmonary edema?', options: ['High-dose lasix', 'BiPAP + inotropes', 'Intubation first', 'IV fluid challenge'], correct: 1, explanation: 'BiPAP for respiratory support plus inotropes (dobutamine) for cardiogenic shock in ED.' },
            
            { category: 'Emergency Cardiology - A-fib RVR', urgency: 'medium', presentation: '72M palpitations and SOB x4 hours. No chest pain. PMH: HTN, hyperlipidemia. Irregular pulse, appears uncomfortable but stable.', vitals: 'BP: 140/90, HR: 165 irregular, RR: 20, O2: 94%', question: 'Patient stable with new A-fib and RVR. ED rate control priority?', options: ['Cardioversion', 'Beta-blockers or calcium channel blockers', 'Digoxin', 'Amiodarone'], correct: 1, explanation: 'Stable A-fib with RVR: rate control with metoprolol or diltiazem first-line in ED.' },
            
            { category: 'Emergency Cardiology - Aortic Dissection', urgency: 'high', presentation: '58M sudden severe tearing chest pain to back while lifting weights. Pain 10/10, maximal at onset. PMH: poorly controlled HTN.', vitals: 'BP: 180/110 (R arm), 155/90 (L arm), HR: 95, RR: 20', question: 'BP differential 25mmHg between arms suggests?', options: ['Measurement error', 'Type A dissection with arch involvement', 'Type B dissection only', 'Subclavian stenosis'], correct: 1, explanation: 'BP differential >20mmHg suggests Type A dissection involving arch vessels. Surgical emergency.' },
            
            { category: 'Emergency Cardiology - Hypertensive Emergency', urgency: 'high', presentation: '55M severe headache, vision changes, and nausea. PMH: HTN, stopped medications 1 week ago. Papilledema on fundoscopy.', vitals: 'BP: 220/130, HR: 95, RR: 18, O2: 96%', question: 'Initial BP reduction goal in hypertensive emergency?', options: ['Normalize BP immediately', 'Reduce by 10-20% in first hour', 'Reduce by 50%', 'No reduction needed'], correct: 1, explanation: 'Reduce BP by 10-20% in first hour, then gradual reduction to avoid cerebral hypoperfusion.' },
            
            { category: 'Emergency Cardiology - Pericarditis', urgency: 'medium', presentation: '28M sharp chest pain that worsens when lying flat, improves when sitting forward. Pain started after recent viral illness. Friction rub audible.', vitals: 'BP: 125/80, HR: 88, RR: 16, Temp: 100.2°F', question: 'EKG shows diffuse ST elevation with PR depression. Treatment?', options: ['Aspirin or ibuprofen', 'Nitroglycerin', 'Beta-blockers', 'ACE inhibitors'], correct: 0, explanation: 'Acute pericarditis: NSAIDs (aspirin, ibuprofen) first-line treatment for inflammation.' },
            
            { category: 'Emergency Cardiology - Cardiac Tamponade', urgency: 'high', presentation: '45F with known malignancy presents with progressive SOB, chest pain, and weakness. JVD, distant heart sounds, pulsus paradoxus 25mmHg.', vitals: 'BP: 90/70, HR: 120, RR: 24, O2: 92%', question: 'Hemodynamically unstable tamponade. ED intervention?', options: ['IV fluids', 'Emergency pericardiocentesis', 'Thoracotomy', 'Diuretics'], correct: 1, explanation: 'Cardiac tamponade with instability: emergency pericardiocentesis. Avoid diuretics/preload reduction.' },
            
            { category: 'Emergency Cardiology - Myocarditis', urgency: 'medium', presentation: '22M athlete with chest pain, fatigue, and SOB x1 week. Recent viral illness 2 weeks ago. Elevated troponin, normal coronaries on cath.', vitals: 'BP: 110/70, HR: 105, RR: 20, Temp: 99.8°F', question: 'Confirmed myocarditis. Activity restriction?', options: ['No restrictions', 'Light activity only', 'Complete activity restriction 3-6 months', 'Gradual return to sports'], correct: 2, explanation: 'Myocarditis: complete activity restriction 3-6 months due to sudden cardiac death risk.' },
            
            { category: 'Emergency Cardiology - Unstable Angina', urgency: 'high', presentation: '64F increasing chest pain at rest x2 days. Previously stable angina now occurring with minimal exertion. Troponin negative, EKG shows T-wave inversions V4-V6.', vitals: 'BP: 145/85, HR: 92, RR: 18, O2: 97%', question: 'ED management for unstable angina?', options: ['Discharge with follow-up', 'Aspirin + anticoagulation + cardiology consult', 'Immediate cath lab', 'Stress testing'], correct: 1, explanation: 'Unstable angina: dual antiplatelet therapy, anticoagulation, urgent cardiology evaluation.' },
            
            { category: 'Emergency Cardiology - Ventricular Tachycardia', urgency: 'high', presentation: '56M with palpitations, dizziness, and chest pain. Wide complex tachycardia on monitor. Previous MI 2 years ago. Conscious but hypotensive.', vitals: 'BP: 85/55, HR: 180, RR: 22, O2: 94%', question: 'Unstable VT with hypotension. Immediate ED treatment?', options: ['Amiodarone', 'Synchronized cardioversion', 'Defibrillation', 'Adenosine'], correct: 1, explanation: 'Unstable VT: synchronized cardioversion. Start with 100J biphasic or 200J monophasic.' },

            // Pulmonology Cases (10)
            { category: 'Emergency Pulmonology - Massive PE', urgency: 'high', presentation: '52M EMS Code Blue at airport customs after 14-hour flight. Witnessed collapse, CPR started. ROSC achieved. PMH: Factor V Leiden, recent knee surgery 3 weeks ago.', vitals: 'BP: 75/45, HR: 135, RR: 32, O2: 78% on 15L NRB', question: 'Hemodynamically unstable suspected massive PE. ED priority assessment?', options: ['STAT CT angiogram', 'Bedside echocardiogram', 'D-dimer level', 'Arterial blood gas'], correct: 1, explanation: 'Bedside echo immediately assesses RV strain in unstable patient. Do not delay care for CT in shock.' },
            
            { category: 'Emergency Pulmonology - Tension Pneumothorax', urgency: 'high', presentation: '28M trauma activation after motorcycle collision. Severe respiratory distress, tracheal deviation to left, absent breath sounds on right, JVD, hypotensive.', vitals: 'BP: 70/40, HR: 140, RR: 35, O2: 78% on BVM', question: 'Clinical presentation suggests tension pneumothorax. Immediate ED intervention?', options: ['STAT chest X-ray', '14G needle 2nd ICS midclavicular', 'Emergency chest tube', 'Intubate first'], correct: 1, explanation: 'Tension pneumothorax is clinical diagnosis. Immediate needle decompression saves life in ED.' },
            
            { category: 'Emergency Pulmonology - Severe Asthma', urgency: 'high', presentation: '25F severe SOB and wheezing x2 hours. Using accessory muscles, speaking in words only. PMH: asthma, recent URI. Peak flow 40% predicted.', vitals: 'BP: 125/80, HR: 125, RR: 32, O2: 88%', question: 'First-line ED treatment for severe asthma exacerbation?', options: ['Nebulized albuterol + ipratropium + oral steroids', 'Intubation', 'Antibiotics', 'Chest X-ray first'], correct: 0, explanation: 'Severe asthma: continuous nebulized albuterol + ipratropium + systemic corticosteroids immediately.' },
            
            { category: 'Emergency Pulmonology - Spontaneous Pneumothorax', urgency: 'medium', presentation: '22M tall, thin college student with sudden onset sharp chest pain and SOB while studying. No trauma. Pain sharp, worse with inspiration.', vitals: 'BP: 120/80, HR: 95, RR: 22, O2: 92%', question: 'Treatment for first-time spontaneous pneumothorax >20%?', options: ['Observation only', 'Needle decompression', 'Chest tube placement', 'Surgery'], correct: 2, explanation: 'Pneumothorax >20% or symptomatic: chest tube placement. <20% and stable: may observe.' },
            
            { category: 'Emergency Pulmonology - COPD Exacerbation', urgency: 'medium', presentation: '68M increased SOB, cough, and sputum production x3 days. PMH: COPD, 40 pack-year smoking history. Using accessory muscles, pursed lip breathing.', vitals: 'BP: 135/85, HR: 105, RR: 28, O2: 85%', question: 'ED treatment for COPD exacerbation includes?', options: ['High-flow oxygen', 'Bronchodilators + steroids + controlled O2', 'Antibiotics only', 'Intubation first'], correct: 1, explanation: 'COPD exacerbation: bronchodilators, systemic steroids, controlled oxygen (88-92% target).' },
            
            { category: 'Emergency Pulmonology - Pneumonia', urgency: 'medium', presentation: '72M cough, fever, SOB x4 days. Productive cough with purulent sputum. Right lower lobe crackles. Appears ill.', vitals: 'BP: 110/70, HR: 102, RR: 24, O2: 91%, Temp: 102.8°F', question: 'Community-acquired pneumonia in elderly. Empiric ED antibiotics?', options: ['Azithromycin only', 'Ceftriaxone + azithromycin', 'Vancomycin + piperacillin-tazobactam', 'Levofloxacin'], correct: 1, explanation: 'CAP in elderly: ceftriaxone + azithromycin covers typical and atypical pathogens.' },
            
            { category: 'Emergency Pulmonology - Acute Respiratory Failure', urgency: 'high', presentation: '55F with progressive SOB, confusion, and fatigue. Known CHF, recent medication non-compliance. Pink frothy sputum, bilateral crackles.', vitals: 'BP: 170/100, HR: 120, RR: 32, O2: 80%', question: 'Acute pulmonary edema with hypoxia. Immediate ED intervention?', options: ['Intubation', 'BiPAP + nitrates + diuretics', 'High-flow oxygen only', 'Bronchodilators'], correct: 1, explanation: 'Acute pulmonary edema: BiPAP for ventilatory support + nitrates + diuretics for preload reduction.' },
            
            { category: 'Emergency Pulmonology - Pleural Effusion', urgency: 'medium', presentation: '60M with progressive SOB and chest pain x2 weeks. Known lung cancer. Decreased breath sounds right side, dullness to percussion.', vitals: 'BP: 125/80, HR: 95, RR: 22, O2: 89%', question: 'Large pleural effusion with respiratory compromise. ED intervention?', options: ['Observation', 'Therapeutic thoracentesis', 'Chest tube', 'Bronchoscopy'], correct: 1, explanation: 'Large symptomatic pleural effusion: therapeutic thoracentesis for symptom relief and diagnosis.' },
            
            { category: 'Emergency Pulmonology - Hemoptysis', urgency: 'medium', presentation: '45M coughing up blood x3 days. 30 pack-year smoking history. Weight loss 15 lbs over 2 months. No fever.', vitals: 'BP: 130/85, HR: 92, RR: 18, O2: 94%', question: 'Massive hemoptysis (>600mL/24hr). ED priority?', options: ['Bronchoscopy', 'Airway protection', 'Antibiotics', 'CT chest'], correct: 1, explanation: 'Massive hemoptysis: airway protection is priority. Position affected side down if known.' },
            
            { category: 'Emergency Pulmonology - Acute Bronchitis', urgency: 'low', presentation: '35F cough x1 week, mostly dry, some clear sputum. No fever, no SOB. Recent cold symptoms resolved. Lungs clear.', vitals: 'BP: 120/75, HR: 78, RR: 16, O2: 98%', question: 'Acute bronchitis in healthy adult. ED treatment?', options: ['Antibiotics', 'Supportive care', 'Steroids', 'Bronchodilators'], correct: 1, explanation: 'Acute bronchitis: supportive care. Antibiotics not indicated unless bacterial superinfection suspected.' },

            // Neurology Cases (10)
            { category: 'Emergency Neurology - Acute Stroke', urgency: 'high', presentation: '72F EMS activation for sudden onset left-sided weakness and speech difficulty. Symptoms started 2 hours ago. PMH: A-fib, not on anticoagulation.', vitals: 'BP: 185/105, HR: 88 irregular, RR: 16, O2: 98%, Glucose: 145', question: 'Patient meets criteria for potential thrombolysis. Most critical ED timeline?', options: ['CT within 25 minutes', 'Thrombolytics within 4.5 hours', 'Both CT <25min and tPA <4.5hrs', 'Neurology consult first'], correct: 2, explanation: 'Stroke protocol: CT within 25 minutes of arrival AND thrombolytics within 4.5 hours of symptom onset.' },
            
            { category: 'Emergency Neurology - Status Epilepticus', urgency: 'high', presentation: '34M brought by EMS with continuous seizure activity >10 minutes. Bystanders report seizure started at home. PMH: epilepsy, poor medication compliance.', vitals: 'BP: 150/90, HR: 120, RR: 16 assisted, O2: 92% BVM, Temp: 101.2°F', question: 'First-line ED treatment for status epilepticus?', options: ['IV phenytoin', 'IV lorazepam or diazepam', 'IV propofol', 'Intubation first'], correct: 1, explanation: 'Status epilepticus: IV benzodiazepines (lorazepam 4mg or diazepam 10mg) are first-line.' },
            
            { category: 'Emergency Neurology - Subarachnoid Hemorrhage', urgency: 'high', presentation: '45F sudden onset worst headache of life while exercising. Vomiting, photophobia, neck stiffness. Thunderclap headache, never had anything like this.', vitals: 'BP: 170/100, HR: 95, RR: 18, O2: 98%', question: 'Non-contrast head CT normal. Next ED step for SAH workup?', options: ['Discharge with headache precautions', 'Lumbar puncture', 'CT angiogram head/neck', 'MRI brain'], correct: 1, explanation: 'SAH suspected with normal CT: LP to look for xanthochromia and RBCs that do not clear.' },
            
            { category: 'Emergency Neurology - Acute Vertigo', urgency: 'medium', presentation: '67M acute onset severe dizziness with nausea and vomiting. Room spinning sensation, difficulty walking. PMH: HTN, DM, smoking. Horizontal nystagmus present.', vitals: 'BP: 160/95, HR: 88, RR: 16, O2: 96%', question: 'Key examination to differentiate peripheral vs central vertigo?', options: ['Romberg test', 'HINTS exam (Head Impulse, Nystagmus, Test of Skew)', 'Weber test', 'Dix-Hallpike maneuver'], correct: 1, explanation: 'HINTS exam more sensitive than MRI for acute stroke in vertigo patients with risk factors.' },
            
            { category: 'Emergency Neurology - Bacterial Meningitis', urgency: 'high', presentation: '23M college student with fever, severe headache, neck stiffness x12 hours. Petechial rash on trunk and extremities. Altered mental status.', vitals: 'BP: 90/60, HR: 125, RR: 24, O2: 94%, Temp: 102.8°F', question: 'Clinical presentation with petechial rash most suggests?', options: ['Viral meningitis', 'Pneumococcal meningitis', 'Meningococcal meningitis', 'Herpes encephalitis'], correct: 2, explanation: 'Petechial/purpuric rash with meningitis suggests meningococcal disease - medical emergency.' },
            
            { category: 'Emergency Neurology - Guillain-Barre Syndrome', urgency: 'medium', presentation: '35M progressive weakness in legs x3 days, now involving arms. Recent gastroenteritis 2 weeks ago. Areflexic, ascending paralysis.', vitals: 'BP: 120/80, HR: 88, RR: 18, O2: 96%', question: 'GBS patient develops respiratory weakness. ED monitoring priority?', options: ['Pulse oximetry', 'Vital capacity and negative inspiratory force', 'Arterial blood gas', 'Chest X-ray'], correct: 1, explanation: 'GBS respiratory monitoring: vital capacity <20mL/kg or NIF <-30cmH2O indicates need for intubation.' },
            
            { category: 'Emergency Neurology - Bell\'s Palsy', urgency: 'low', presentation: '42F sudden onset left facial weakness x1 day. Cannot close left eye, forehead weakness, drooling. No other neurologic deficits.', vitals: 'BP: 125/80, HR: 78, RR: 16, O2: 98%', question: 'Bell\'s palsy within 72 hours. ED treatment?', options: ['No treatment', 'Prednisone', 'Antivirals only', 'Prednisone + antivirals'], correct: 1, explanation: 'Bell\'s palsy: prednisone within 72 hours improves outcomes. Antivirals controversial.' },
            
            { category: 'Emergency Neurology - Myasthenia Gravis Crisis', urgency: 'high', presentation: '55F known myasthenia gravis with increasing weakness, difficulty swallowing, and SOB x2 days. Recent infection. Ptosis, diplopia worsening.', vitals: 'BP: 130/85, HR: 95, RR: 24, O2: 91%', question: 'Myasthenic crisis management in ED?', options: ['Increase anticholinesterase', 'Plasmapheresis or IVIG', 'High-dose steroids', 'Antibiotics only'], correct: 1, explanation: 'Myasthenic crisis: plasmapheresis or IVIG. Avoid increasing anticholinesterase (may worsen).' },
            
            { category: 'Emergency Neurology - Intracerebral Hemorrhage', urgency: 'high', presentation: '68M sudden onset severe headache with vomiting, left-sided weakness. PMH: HTN, poorly controlled. Found down by family 1 hour ago.', vitals: 'BP: 210/120, HR: 88, RR: 16, O2: 96%', question: 'Suspected ICH with severe HTN. ED BP management?', options: ['No BP reduction', 'Reduce to <140/90', 'Reduce by 15% or to <180/105', 'Normalize BP immediately'], correct: 2, explanation: 'ICH with severe HTN: reduce by 15% or to <180/105. Avoid aggressive reduction.' },
            
            { category: 'Emergency Neurology - Transient Ischemic Attack', urgency: 'medium', presentation: '62M transient left-sided weakness and speech difficulty x20 minutes, now resolved. PMH: HTN, hyperlipidemia. NIHSS now 0.', vitals: 'BP: 155/90, HR: 85, RR: 16, O2: 98%', question: 'TIA patient, ABCD2 score 4. ED disposition?', options: ['Discharge home', 'Observation 24 hours', 'Admit for stroke workup', 'Outpatient follow-up only'], correct: 2, explanation: 'ABCD2 score ≥4: high risk for stroke within 48 hours. Admit for urgent evaluation.' },

            // Endocrinology Cases (10)
            { category: 'Emergency Endocrinology - DKA', urgency: 'high', presentation: '22F type 1 diabetic with nausea, vomiting, abdominal pain x2 days. Kussmaul respirations, fruity breath odor, dehydrated. Ran out of insulin 3 days ago.', vitals: 'BP: 100/60, HR: 120, RR: 28, O2: 98%, Glucose: 485', question: 'ABG shows pH 7.15, CO2 15, HCO3 8. Ketones positive. This represents?', options: ['Respiratory acidosis', 'Metabolic alkalosis', 'Diabetic ketoacidosis', 'Hyperosmolar state'], correct: 2, explanation: 'DKA triad: hyperglycemia + ketosis + metabolic acidosis. Kussmaul respirations compensate.' },
            
            { category: 'Emergency Endocrinology - HHS', urgency: 'high', presentation: '68M type 2 diabetic found confused at home. Severe dehydration, altered mental status. No ketones detected. Recent pneumonia on antibiotics.', vitals: 'BP: 90/50, HR: 110, RR: 20, O2: 94%, Temp: 101.2°F, Glucose: 850', question: 'Glucose 850, no ketones, altered mental status. Most likely diagnosis?', options: ['DKA', 'Hyperosmolar hyperglycemic state', 'Sepsis', 'Stroke'], correct: 1, explanation: 'HHS: severe hyperglycemia + dehydration + altered mental status WITHOUT significant ketosis.' },
            
            { category: 'Emergency Endocrinology - Severe Hypoglycemia', urgency: 'high', presentation: '45M type 1 diabetic found unconscious by family. Diaphoretic, tachycardic. Family reports he took insulin but didn\'t eat. Glucometer reads LOW.', vitals: 'BP: 120/80, HR: 110, RR: 16, O2: 98%', question: 'Unconscious patient with suspected severe hypoglycemia. Immediate ED treatment?', options: ['Oral glucose', 'IV D50W', 'Glucagon IM', 'Both IV D50W and glucagon'], correct: 1, explanation: 'Unconscious hypoglycemic patient: IV D50W (25g dextrose) for immediate reversal.' },
            
            { category: 'Emergency Endocrinology - Thyroid Storm', urgency: 'high', presentation: '35F hyperthyroid patient with fever, tachycardia, altered mental status. Recent medication non-compliance. Agitated, diaphoretic, tremulous.', vitals: 'BP: 160/90, HR: 160, RR: 24, O2: 96%, Temp: 104.2°F', question: 'First-line ED treatment for thyroid storm?', options: ['Propylthiouracil only', 'Beta-blockers only', 'PTU + beta-blockers + iodine + steroids', 'Thyroidectomy'], correct: 2, explanation: 'Thyroid storm: PTU (blocks synthesis) + propranolol + iodine (blocks release) + steroids.' },
            
            { category: 'Emergency Endocrinology - Adrenal Crisis', urgency: 'high', presentation: '52F known Addison\'s disease with nausea, vomiting, weakness x2 days. Stopped taking prednisone due to side effects. Hypotensive, confused.', vitals: 'BP: 75/45, HR: 125, RR: 22, O2: 96%, Na: 125, K: 5.8', question: 'Immediate ED treatment for adrenal crisis?', options: ['Oral prednisone', 'IV hydrocortisone + fluid resuscitation', 'Fludrocortisone only', 'IV insulin'], correct: 1, explanation: 'Adrenal crisis: immediate IV hydrocortisone (100-200mg) + aggressive fluid resuscitation.' },
            
            { category: 'Emergency Endocrinology - Myxedema Coma', urgency: 'high', presentation: '75F altered mental status, hypothermia, bradycardia. Known hypothyroidism, stopped taking levothyroxine. Family reports progressive confusion x1 week.', vitals: 'BP: 90/50, HR: 45, RR: 8, O2: 88%, Temp: 92.4°F', question: 'Myxedema coma treatment in ED?', options: ['Oral levothyroxine', 'IV levothyroxine + supportive care', 'Warming only', 'Steroids only'], correct: 1, explanation: 'Myxedema coma: IV levothyroxine + supportive care (warming, ventilation, pressors if needed).' },
            
            { category: 'Emergency Endocrinology - Hypercalcemic Crisis', urgency: 'high', presentation: '58M with confusion, weakness, nausea, and kidney stones. PMH: parathyroid adenoma. Calcium 15.2 mg/dL, altered mental status.', vitals: 'BP: 100/65, HR: 95, RR: 16, O2: 96%', question: 'Severe hypercalcemia (>14 mg/dL) with symptoms. ED treatment priority?', options: ['Oral phosphate', 'IV normal saline + calcitonin', 'Hemodialysis', 'Bisphosphonates only'], correct: 1, explanation: 'Severe hypercalcemia: IV normal saline hydration + calcitonin for rapid calcium reduction.' },
            
            { category: 'Emergency Endocrinology - SIADH', urgency: 'medium', presentation: '65M with lung cancer presents with confusion and weakness. Serum sodium 118 mEq/L, urine osmolality elevated, euvolemic.', vitals: 'BP: 125/80, HR: 88, RR: 16, O2: 96%', question: 'SIADH with severe symptomatic hyponatremia. ED treatment?', options: ['Free water restriction only', '3% hypertonic saline', 'Normal saline', 'Furosemide'], correct: 1, explanation: 'Severe symptomatic hyponatremia: 3% hypertonic saline with careful monitoring.' },
            
            { category: 'Emergency Endocrinology - Diabetic Foot Infection', urgency: 'medium', presentation: '52M diabetic with foot ulcer x2 weeks, now with redness, swelling, foul odor. Fever and chills started yesterday. Poor glucose control.', vitals: 'BP: 110/70, HR: 105, RR: 20, O2: 96%, Temp: 101.8°F, Glucose: 285', question: 'Severe diabetic foot infection. ED management?', options: ['Oral antibiotics', 'IV antibiotics + surgical consult', 'Topical antibiotics', 'Observation'], correct: 1, explanation: 'Severe diabetic foot infection: IV broad-spectrum antibiotics + urgent surgical evaluation.' },
            
            { category: 'Emergency Endocrinology - Pheochromocytoma Crisis', urgency: 'high', presentation: '42F severe headache, palpitations, diaphoresis, and hypertensive emergency. Episodic symptoms x6 months. BP extremely labile.', vitals: 'BP: 240/140, HR: 140, RR: 24, O2: 96%', question: 'Pheochromocytoma crisis with severe HTN. ED treatment?', options: ['Beta-blockers first', 'Alpha-blockers (phentolamine)', 'ACE inhibitors', 'Calcium channel blockers'], correct: 1, explanation: 'Pheochromocytoma crisis: alpha-blockade first (phentolamine). Avoid beta-blockers alone (unopposed alpha).' },

            // Gastroenterology Cases (10)
            { category: 'Emergency Gastroenterology - Upper GI Bleed', urgency: 'high', presentation: '58M hematemesis and melena x6 hours. Lightheaded when standing. PMH: cirrhosis, previous variceal bleeding, takes NSAIDs for arthritis.', vitals: 'BP: 100/60 lying, 85/50 standing, HR: 110, RR: 20, O2: 96%', question: 'Patient with cirrhosis and GI bleeding. Additional ED management?', options: ['Prophylactic antibiotics', 'Octreotide infusion', 'Both antibiotics and octreotide', 'Neither needed'], correct: 2, explanation: 'Cirrhosis + GI bleed: prophylactic antibiotics AND octreotide to reduce portal pressure.' },
            
            { category: 'Emergency Gastroenterology - Acute Pancreatitis', urgency: 'high', presentation: '42F severe epigastric pain radiating to back, nausea, vomiting x8 hours. Pain constant, 9/10. PMH: gallstones, social alcohol use.', vitals: 'BP: 110/70, HR: 105, RR: 22, O2: 95%, Temp: 100.4°F', question: 'Initial ED management for acute pancreatitis?', options: ['NPO and pain control only', 'Aggressive IV fluids + pain control', 'Immediate surgery consult', 'Antibiotics'], correct: 1, explanation: 'Acute pancreatitis: aggressive IV fluid resuscitation (LR preferred) and adequate pain control.' },
            
            { category: 'Emergency Gastroenterology - Bowel Obstruction', urgency: 'medium', presentation: '65M crampy abdominal pain, vomiting, no flatus x24 hours. Previous appendectomy 20 years ago. Abdomen distended, high-pitched bowel sounds.', vitals: 'BP: 120/80, HR: 95, RR: 18, O2: 96%', question: 'CT shows small bowel obstruction without strangulation. Initial ED management?', options: ['Immediate surgery', 'NGT decompression + IV fluids', 'Oral contrast challenge', 'Discharge with follow-up'], correct: 1, explanation: 'Uncomplicated SBO: NGT decompression, IV fluids, NPO. Many resolve without surgery.' },
            
            { category: 'Emergency Gastroenterology - Acute Cholangitis', urgency: 'high', presentation: '70M jaundice, fever, and RUQ pain x2 days. Charcot\'s triad present. PMH: cholelithiasis. Appears septic with altered mental status.', vitals: 'BP: 85/50, HR: 120, RR: 24, O2: 94%, Temp: 103.2°F', question: 'Patient meets criteria for acute cholangitis with sepsis. ED priorities?', options: ['IV antibiotics only', 'Emergent ERCP', 'Antibiotics + fluid resuscitation + urgent ERCP', 'Surgery consult'], correct: 2, explanation: 'Acute cholangitis: broad-spectrum antibiotics, resuscitation, urgent biliary decompression (ERCP).' },
            
            { category: 'Emergency Gastroenterology - Acute Appendicitis', urgency: 'medium', presentation: '28M periumbilical pain migrating to RLQ x12 hours. Anorexia, nausea, low-grade fever. RLQ tenderness, positive Rovsing\'s sign.', vitals: 'BP: 125/75, HR: 88, RR: 16, O2: 98%, Temp: 100.8°F', question: 'CT shows acute appendicitis without perforation. ED management?', options: ['Antibiotics and discharge', 'Immediate appendectomy', 'Surgery consult + antibiotics + NPO', 'Observation only'], correct: 2, explanation: 'Acute appendicitis: surgery consult, IV antibiotics, NPO, pain control while awaiting OR.' },
            
            { category: 'Emergency Gastroenterology - Diverticulitis', urgency: 'medium', presentation: '58F left lower quadrant pain x2 days. Low-grade fever, nausea. PMH: known diverticulosis. LLQ tenderness without peritoneal signs.', vitals: 'BP: 130/80, HR: 90, RR: 16, O2: 98%, Temp: 100.6°F', question: 'Uncomplicated diverticulitis. ED treatment?', options: ['Clear liquids + oral antibiotics', 'IV antibiotics + admission', 'Surgery consult', 'Colonoscopy'], correct: 0, explanation: 'Uncomplicated diverticulitis: clear liquid diet + oral antibiotics (ciprofloxacin + metronidazole).' },
            
            { category: 'Emergency Gastroenterology - Peptic Ulcer Disease', urgency: 'medium', presentation: '45M epigastric pain x1 week, worse with empty stomach, better with food. Takes ibuprofen daily for back pain. No melena or hematemesis.', vitals: 'BP: 125/80, HR: 85, RR: 16, O2: 98%', question: 'Suspected peptic ulcer disease. ED management?', options: ['PPI + H. pylori testing', 'Immediate endoscopy', 'Surgery consult', 'Continue NSAIDs'], correct: 0, explanation: 'PUD: PPI therapy + H. pylori testing/treatment. Avoid NSAIDs.' },
            
            { category: 'Emergency Gastroenterology - Viral Gastroenteritis', urgency: 'low', presentation: '35M nausea, vomiting, diarrhea x2 days. Multiple family members with similar symptoms. No fever, no blood in stool. Appears mildly dehydrated.', vitals: 'BP: 120/75, HR: 95, RR: 16, O2: 98%', question: 'Viral gastroenteritis with mild dehydration. ED treatment?', options: ['Antibiotics', 'IV fluids + antiemetics', 'Immediate CT abdomen', 'Admission'], correct: 1, explanation: 'Viral gastroenteritis: supportive care with IV fluids for dehydration + antiemetics.' },
            
            { category: 'Emergency Gastroenterology - Inflammatory Bowel Disease Flare', urgency: 'medium', presentation: '28F known Crohn\'s disease with increased abdominal pain, diarrhea 8x/day with blood, weight loss. Stopped taking medications 2 months ago.', vitals: 'BP: 115/70, HR: 100, RR: 18, O2: 96%, Temp: 100.2°F', question: 'IBD flare with bloody diarrhea. ED treatment?', options: ['Antibiotics only', 'Corticosteroids', 'Surgery consult', 'Antidiarrheals'], correct: 1, explanation: 'IBD flare: corticosteroids (prednisone or IV methylprednisolone) for acute exacerbation.' },
            
            { category: 'Emergency Gastroenterology - Esophageal Foreign Body', urgency: 'medium', presentation: '45M unable to swallow after eating steak. Food feels stuck in chest. Drooling, unable to swallow saliva. No respiratory distress.', vitals: 'BP: 130/85, HR: 95, RR: 18, O2: 96%', question: 'Food impaction in esophagus. ED management?', options: ['Observation', 'Glucagon IV', 'Urgent endoscopy', 'Meat tenderizer'], correct: 2, explanation: 'Esophageal food impaction: urgent endoscopy for removal, especially if unable to handle secretions.' },

            // Nephrology Cases (10)
            { category: 'Emergency Nephrology - Hyperkalemia', urgency: 'high', presentation: '55M EMS transport for weakness and palpitations. PMH: CKD, missed dialysis x3 days. EKG shows peaked T waves and wide QRS.', vitals: 'BP: 150/90, HR: 45, RR: 18, O2: 96%', question: 'Severe hyperkalemia with EKG changes. Immediate ED treatment?', options: ['Kayexalate only', 'Calcium gluconate + insulin/glucose', 'Dialysis first', 'Albuterol nebulizer'], correct: 1, explanation: 'Severe hyperkalemia with EKG changes: calcium for cardiac protection, then insulin/glucose to shift K+.' },
            
            { category: 'Emergency Nephrology - Acute Kidney Injury', urgency: 'medium', presentation: '68F decreased urine output x3 days. PMH: CHF, DM, HTN, recent contrast CT 5 days ago. Taking lisinopril, metformin, lasix.', vitals: 'BP: 160/95, HR: 88, RR: 20, O2: 94%', question: 'Patient taking metformin with AKI. ED management concern?', options: ['Continue metformin', 'Hold metformin - lactic acidosis risk', 'Increase metformin dose', 'Switch to insulin only'], correct: 1, explanation: 'Hold metformin in AKI due to increased risk of lactic acidosis with decreased clearance.' },
            
            { category: 'Emergency Nephrology - Nephrolithiasis', urgency: 'medium', presentation: '35M sudden onset severe left flank pain radiating to groin. Pain colicky, 10/10, nausea, vomiting. Restless, unable to find comfortable position.', vitals: 'BP: 140/90, HR: 105, RR: 20, O2: 96%', question: 'CT shows 6mm stone at ureterovesical junction. ED management?', options: ['Immediate urology consult', 'Pain control + medical expulsive therapy', 'Lithotripsy', 'Observation only'], correct: 1, explanation: 'Stone 5-10mm: pain control + alpha-blocker (tamsulosin) for medical expulsive therapy.' },
            
            { category: 'Emergency Nephrology - Pyelonephritis', urgency: 'medium', presentation: '28F with fever, flank pain, and dysuria x2 days. Nausea, vomiting, appears ill. CVA tenderness. UA shows WBC, bacteria, nitrites positive.', vitals: 'BP: 110/70, HR: 102, RR: 18, O2: 96%, Temp: 102.6°F', question: 'Uncomplicated pyelonephritis in healthy female. ED treatment?', options: ['Oral antibiotics', 'IV antibiotics then oral', 'Hospitalization required', 'Antifungals'], correct: 1, explanation: 'Uncomplicated pyelonephritis: IV antibiotics initially, then oral (fluoroquinolone or ceftriaxone → oral).' },
            
            { category: 'Emergency Nephrology - Rhabdomyolysis', urgency: 'high', presentation: '32M found down after binge drinking, unable to move for 12 hours. Dark urine, muscle pain and swelling. Extreme muscle tenderness.', vitals: 'BP: 125/80, HR: 105, RR: 18, O2: 96%', question: 'Rhabdomyolysis with elevated CK. ED treatment priority?', options: ['Pain control', 'Aggressive IV fluid resuscitation', 'Dialysis immediately', 'Muscle relaxants'], correct: 1, explanation: 'Rhabdomyolysis: aggressive IV fluids to prevent AKI from myoglobin precipitation in kidneys.' },
            
            { category: 'Emergency Nephrology - Glomerulonephritis', urgency: 'medium', presentation: '45M dark urine, facial swelling, and HTN x1 week. Recent strep throat 2 weeks ago. Periorbital edema, HTN, proteinuria.', vitals: 'BP: 180/110, HR: 88, RR: 18, O2: 96%', question: 'Patient has severe hypertension with glomerulonephritis. ED management?', options: ['No treatment needed', 'Gradual BP reduction', 'Immediate BP normalization', 'Dialysis'], correct: 1, explanation: 'Hypertension in glomerulonephritis: gradual reduction to avoid compromising renal perfusion.' },
            
            { category: 'Emergency Nephrology - Urinary Retention', urgency: 'medium', presentation: '72M inability to urinate x8 hours with severe suprapubic pain. PMH: BPH, taking alpha-blockers. Bladder palpable to umbilicus.', vitals: 'BP: 150/85, HR: 95, RR: 18, O2: 96%', question: 'Immediate ED management for acute urinary retention?', options: ['Alpha-blocker trial', 'Foley catheter insertion', 'Suprapubic catheter', 'Urology consult first'], correct: 1, explanation: 'Acute urinary retention: immediate relief with Foley catheter insertion in ED.' },
            
            { category: 'Emergency Nephrology - Dialysis Emergency', urgency: 'high', presentation: '58F on hemodialysis missed 2 treatments, now with SOB, chest pain, and weakness. Bilateral crackles, JVD, peripheral edema.', vitals: 'BP: 180/100, HR: 110, RR: 28, O2: 88%', question: 'Fluid overload in dialysis patient. ED management?', options: ['High-dose lasix', 'Emergency dialysis', 'BiPAP + nitrates', 'IV fluids'], correct: 1, explanation: 'Dialysis patient with fluid overload: emergency dialysis is definitive treatment.' },
            
            { category: 'Emergency Nephrology - Nephrotic Syndrome', urgency: 'medium', presentation: '45F with massive proteinuria, hypoalbuminemia, and edema. Recent viral illness. Anasarca, ascites present.', vitals: 'BP: 140/90, HR: 85, RR: 18, O2: 94%', question: 'Nephrotic syndrome with anasarca. ED complication concern?', options: ['Hyperkalemia', 'Thromboembolism', 'Hypernatremia', 'Metabolic alkalosis'], correct: 1, explanation: 'Nephrotic syndrome: increased thromboembolism risk due to protein loss and hypercoagulable state.' },
            
            { category: 'Emergency Nephrology - Hemolytic Uremic Syndrome', urgency: 'high', presentation: '8F with bloody diarrhea x3 days, now with decreased urine output, pallor, and petechiae. Recent E. coli gastroenteritis.', vitals: 'BP: 160/100, HR: 120, RR: 24, O2: 94%', question: 'HUS triad includes all EXCEPT?', options: ['Hemolytic anemia', 'Thrombocytopenia', 'Acute kidney injury', 'Leukocytosis'], correct: 3, explanation: 'HUS triad: hemolytic anemia + thrombocytopenia + acute kidney injury. Leukocytosis not part of triad.' },

            // Trauma Cases (10)
            { category: 'Emergency Trauma - Major Trauma Assessment', urgency: 'high', presentation: '25M motorcycle collision at 60mph. Multiple injuries apparent. Conscious but confused. Visible deformity right leg, abdominal pain and distension.', vitals: 'BP: 90/60, HR: 130, RR: 24, O2: 92%', question: 'Initial trauma survey priority (ABCs)?', options: ['Airway assessment', 'Breathing assessment', 'Circulation assessment', 'All simultaneously'], correct: 3, explanation: 'Major trauma: simultaneous assessment of Airway, Breathing, Circulation in primary survey.' },
            
            { category: 'Emergency Trauma - Tension Pneumothorax', urgency: 'high', presentation: '32M stabbing to right chest. Severe respiratory distress, tracheal deviation left, absent breath sounds right, hypotensive, JVD.', vitals: 'BP: 75/40, HR: 140, RR: 35, O2: 78%', question: 'Clinical tension pneumothorax. Immediate intervention?', options: ['Chest X-ray', 'Needle decompression 2nd ICS MCL', 'Chest tube', 'Intubation'], correct: 1, explanation: 'Tension pneumothorax: immediate needle decompression 2nd intercostal space, midclavicular line.' },
            
            { category: 'Emergency Trauma - Hemorrhagic Shock', urgency: 'high', presentation: '28F car accident with pelvic fracture. Hypotensive, tachycardic, altered mental status. Pelvic instability on examination.', vitals: 'BP: 80/50, HR: 125, RR: 22, O2: 94%', question: 'Unstable pelvic fracture with shock. ED management priority?', options: ['Pelvic X-ray', 'Pelvic binder + fluid resuscitation', 'CT scan', 'Surgery consult'], correct: 1, explanation: 'Unstable pelvic fracture: pelvic binder to control bleeding + aggressive resuscitation.' },
            
            { category: 'Emergency Trauma - Head Injury', urgency: 'high', presentation: '45M fall from ladder, brief LOC. Now awake but confused. Vomiting x2, severe headache. No focal neurologic deficits.', vitals: 'BP: 160/90, HR: 60, RR: 12, O2: 98%', question: 'Signs of increased ICP. Most concerning vital sign pattern?', options: ['Tachycardia + hypotension', 'Bradycardia + hypertension', 'Normal vitals', 'Tachypnea only'], correct: 1, explanation: 'Cushing\'s triad: bradycardia + hypertension + irregular respirations indicate increased ICP.' },
            
            { category: 'Emergency Trauma - Spinal Injury', urgency: 'high', presentation: '22M diving accident in shallow water. Cannot move arms or legs, numbness below neck. Conscious and alert. Cervical spine tenderness.', vitals: 'BP: 85/50, HR: 55, RR: 16, O2: 96%', question: 'Complete spinal cord injury with neurogenic shock. ED management?', options: ['High-dose steroids', 'Fluid resuscitation + vasopressors', 'Immediate surgery', 'Observation'], correct: 1, explanation: 'Neurogenic shock: fluid resuscitation + vasopressors (phenylephrine preferred). Steroids controversial.' },
            
            { category: 'Emergency Trauma - Abdominal Trauma', urgency: 'high', presentation: '35M blunt abdominal trauma from steering wheel. Abdominal pain and distension, guarding, hypotensive. FAST exam positive.', vitals: 'BP: 85/55, HR: 115, RR: 20, O2: 95%', question: 'Positive FAST with hemodynamic instability. ED management?', options: ['CT abdomen', 'Exploratory laparotomy', 'Serial abdominal exams', 'Diagnostic peritoneal lavage'], correct: 1, explanation: 'Positive FAST + hemodynamic instability = immediate exploratory laparotomy.' },
            
            { category: 'Emergency Trauma - Chest Trauma', urgency: 'high', presentation: '40M blunt chest trauma from steering wheel. Severe chest pain, SOB. Paradoxical chest wall movement on right side.', vitals: 'BP: 120/80, HR: 105, RR: 28, O2: 88%', question: 'Flail chest with respiratory compromise. ED management?', options: ['Chest tube only', 'Positive pressure ventilation', 'Pain control only', 'Rib fixation'], correct: 1, explanation: 'Flail chest with respiratory failure: positive pressure ventilation (BiPAP or intubation).' },
            
            { category: 'Emergency Trauma - Extremity Trauma', urgency: 'medium', presentation: '30F open tibia fracture from motorcycle accident. Bone protruding through skin, active bleeding controlled. Distal pulses present.', vitals: 'BP: 110/70, HR: 95, RR: 18, O2: 98%', question: 'Open fracture management in ED?', options: ['Immediate reduction', 'Antibiotics + tetanus + orthopedic consult', 'Splinting only', 'Surgery can wait'], correct: 1, explanation: 'Open fracture: immediate antibiotics, tetanus prophylaxis, urgent orthopedic consultation.' },
            
            { category: 'Emergency Trauma - Burns', urgency: 'medium', presentation: '25M house fire with burns to face, chest, and both arms. Singed nasal hairs, hoarse voice, carbonaceous sputum.', vitals: 'BP: 125/80, HR: 100, RR: 22, O2: 94%', question: 'Signs of inhalation injury. ED priority?', options: ['IV fluids', 'Early intubation', 'Wound care', 'Pain control'], correct: 1, explanation: 'Inhalation injury signs: early intubation before airway swelling makes it impossible.' },
            
            { category: 'Emergency Trauma - Penetrating Trauma', urgency: 'high', presentation: '28M gunshot wound to chest. Entrance wound 4th ICS left sternal border. Hypotensive, muffled heart sounds, JVD.', vitals: 'BP: 75/45, HR: 130, RR: 26, O2: 90%', question: 'Beck\'s triad suggests cardiac tamponade. ED intervention?', options: ['Chest tube', 'Pericardiocentesis', 'Emergency thoracotomy', 'IV fluids only'], correct: 2, explanation: 'Penetrating cardiac trauma with arrest: emergency department thoracotomy may be life-saving.' },

            // Infectious Disease Cases (10)
            { category: 'Emergency Infectious Disease - Sepsis', urgency: 'high', presentation: '65F with fever, chills, and confusion x2 days. PMH: diabetes, UTIs. Appears ill, warm skin, altered mental status.', vitals: 'BP: 85/50, HR: 120, RR: 24, O2: 94%, Temp: 102.8°F, Lactate: 4.2', question: 'Septic shock criteria met. ED management priority?', options: ['Blood cultures first', '30mL/kg IV fluids within 3 hours', 'Antibiotics within 1 hour', 'All of the above'], correct: 3, explanation: 'Sepsis bundle: cultures, antibiotics within 1 hour, 30mL/kg fluids within 3 hours.' },
            
            { category: 'Emergency Infectious Disease - Meningitis', urgency: 'high', presentation: '19F college student with severe headache, neck stiffness, fever, and photophobia x8 hours. Kernig and Brudzinski signs positive.', vitals: 'BP: 110/70, HR: 105, RR: 20, O2: 96%, Temp: 103.1°F', question: 'Suspected bacterial meningitis. ED antibiotic timing?', options: ['After lumbar puncture', 'After CT scan', 'Immediately, before LP', 'After blood cultures'], correct: 2, explanation: 'Bacterial meningitis: antibiotics immediately, do not delay for LP or imaging.' },
            
            { category: 'Emergency Infectious Disease - Cellulitis', urgency: 'medium', presentation: '45M with red, warm, tender area on right leg x2 days. Expanding erythema, fever. No drainage or fluctuance. Diabetic.', vitals: 'BP: 130/80, HR: 95, RR: 18, O2: 98%, Temp: 101.2°F', question: 'Cellulitis in diabetic patient. ED antibiotic choice?', options: ['Clindamycin', 'Cephalexin', 'Vancomycin', 'Clindamycin or vancomycin'], correct: 3, explanation: 'Diabetic cellulitis: cover MRSA with clindamycin, vancomycin, or linezolid.' },
            
            { category: 'Emergency Infectious Disease - Necrotizing Fasciitis', urgency: 'high', presentation: '52M severe pain out of proportion to skin findings on thigh. Bullae, skin necrosis, systemic toxicity. Recent minor trauma.', vitals: 'BP: 90/55, HR: 125, RR: 22, O2: 94%, Temp: 102.6°F', question: 'Necrotizing fasciitis suspected. ED management?', options: ['Antibiotics only', 'Surgical debridement + antibiotics', 'CT scan first', 'Wound culture'], correct: 1, explanation: 'Necrotizing fasciitis: emergency surgical debridement + broad-spectrum antibiotics.' },
            
            { category: 'Emergency Infectious Disease - Endocarditis', urgency: 'high', presentation: '35M IV drug user with fever, chills, and fatigue x1 week. New heart murmur, splinter hemorrhages, Janeway lesions.', vitals: 'BP: 110/60, HR: 110, RR: 20, O2: 95%, Temp: 102.4°F', question: 'Suspected endocarditis in IVDU. ED antibiotic coverage?', options: ['Penicillin', 'Vancomycin + gentamicin', 'Ceftriaxone', 'Clindamycin'], correct: 1, explanation: 'IVDU endocarditis: vancomycin + gentamicin to cover MRSA and gram-negatives.' },
            
            { category: 'Emergency Infectious Disease - C. diff Colitis', urgency: 'medium', presentation: '68F recent hospitalization with antibiotics, now watery diarrhea 8x/day, abdominal pain, fever. Foul-smelling stool.', vitals: 'BP: 100/65, HR: 100, RR: 18, O2: 96%, Temp: 101.8°F', question: 'Suspected C. diff colitis. ED treatment?', options: ['Metronidazole', 'Vancomycin PO', 'Fidaxomicin', 'Vancomycin PO preferred'], correct: 3, explanation: 'C. diff colitis: oral vancomycin first-line (metronidazole second-line).' },
            
            { category: 'Emergency Infectious Disease - Pneumonia', urgency: 'medium', presentation: '55M cough, fever, SOB x3 days. Rusty sputum, right-sided chest pain. Right lower lobe consolidation on exam.', vitals: 'BP: 125/80, HR: 95, RR: 22, O2: 92%, Temp: 102.2°F', question: 'Community-acquired pneumonia. CURB-65 score includes?', options: ['Confusion, Urea, RR≥30, BP<90/60, Age≥65', 'Cough, Urea, RR≥30, BP<90/60, Age≥65', 'Confusion, Urea, RR≥20, BP<90/60, Age≥60', 'Confusion, Urea, RR≥30, BP<80/50, Age≥65'], correct: 0, explanation: 'CURB-65: Confusion, Urea >7, RR≥30, BP<90/60, Age≥65. Score ≥2 consider admission.' },
            
            { category: 'Emergency Infectious Disease - Urinary Tract Infection', urgency: 'medium', presentation: '32F dysuria, urgency, frequency x2 days. No fever, no flank pain. Sexually active, otherwise healthy.', vitals: 'BP: 120/75, HR: 80, RR: 16, O2: 98%', question: 'Uncomplicated UTI in healthy female. ED treatment?', options: ['Ciprofloxacin 3 days', 'Trimethoprim-sulfamethoxazole 3 days', 'Nitrofurantoin 5 days', 'Any of the above'], correct: 3, explanation: 'Uncomplicated UTI: nitrofurantoin 5 days, TMP-SMX 3 days, or ciprofloxacin 3 days.' },
            
            { category: 'Emergency Infectious Disease - Influenza', urgency: 'low', presentation: '28M fever, myalgias, headache, cough x2 days during flu season. No respiratory distress. Appears uncomfortable but stable.', vitals: 'BP: 120/80, HR: 88, RR: 16, O2: 98%, Temp: 101.6°F', question: 'Influenza within 48 hours of symptom onset. ED treatment?', options: ['Antibiotics', 'Oseltamivir', 'Supportive care only', 'Oseltamivir if high-risk'], correct: 3, explanation: 'Influenza: oseltamivir within 48 hours if high-risk or severe. Otherwise supportive care.' },
            
            { category: 'Emergency Infectious Disease - Tick-borne Disease', urgency: 'medium', presentation: '42M fever, headache, myalgias x5 days after camping in Connecticut. Bulls-eye rash on thigh noted 1 week ago, now faded.', vitals: 'BP: 125/80, HR: 90, RR: 16, O2: 98%, Temp: 101.4°F', question: 'Early Lyme disease with erythema migrans. ED treatment?', options: ['Doxycycline', 'Amoxicillin', 'Ceftriaxone', 'Doxycycline preferred'], correct: 3, explanation: 'Early Lyme disease: doxycycline 14-21 days (amoxicillin if pregnant/child <8).' },

            // Toxicology Cases (10)
            { category: 'Emergency Toxicology - Acetaminophen Overdose', urgency: 'high', presentation: '22F ingested 15g acetaminophen 8 hours ago after argument. Initially asymptomatic, now nausea and vomiting. Suicide attempt.', vitals: 'BP: 120/80, HR: 95, RR: 18, O2: 98%', question: 'Acetaminophen level at 8 hours above treatment line. ED antidote?', options: ['Activated charcoal', 'N-acetylcysteine', 'Naloxone', 'Flumazenil'], correct: 1, explanation: 'Acetaminophen overdose: N-acetylcysteine most effective within 8 hours, but beneficial up to 24 hours.' },
            
            { category: 'Emergency Toxicology - Salicylate Poisoning', urgency: 'high', presentation: '35M chronic aspirin use for arthritis, now confusion, tinnitus, and hyperthermia. Taking >300mg/day for months.', vitals: 'BP: 110/70, HR: 120, RR: 30, O2: 98%, Temp: 102.8°F', question: 'Salicylate toxicity with altered mental status. ED treatment?', options: ['Activated charcoal', 'Sodium bicarbonate + hemodialysis', 'Supportive care only', 'Gastric lavage'], correct: 1, explanation: 'Severe salicylate toxicity: sodium bicarbonate + hemodialysis for levels >100 or severe symptoms.' },
            
            { category: 'Emergency Toxicology - Opioid Overdose', urgency: 'high', presentation: '26M found unconscious with pinpoint pupils, shallow breathing. Empty pill bottles nearby. Known heroin user.', vitals: 'BP: 90/60, HR: 55, RR: 6, O2: 85%', question: 'Opioid overdose with respiratory depression. Immediate ED treatment?', options: ['Flumazenil', 'Naloxone', 'Intubation', 'Naloxone + respiratory support'], correct: 3, explanation: 'Opioid overdose: naloxone + respiratory support (bag-mask ventilation, intubation if needed).' },
            
            { category: 'Emergency Toxicology - Tricyclic Antidepressant Overdose', urgency: 'high', presentation: '19F ingested bottle of amitriptyline. Altered mental status, seizure in ambulance. Wide complex tachycardia on EKG.', vitals: 'BP: 80/50, HR: 140, RR: 22, O2: 94%', question: 'TCA overdose with wide complex tachycardia. ED treatment?', options: ['Flumazenil', 'Sodium bicarbonate', 'Activated charcoal', 'Cardioversion'], correct: 1, explanation: 'TCA overdose with wide QRS: sodium bicarbonate to narrow QRS and improve hemodynamics.' },
            
            { category: 'Emergency Toxicology - Methanol Poisoning', urgency: 'high', presentation: '45M homeless man with altered mental status after drinking "antifreeze." Visual complaints, metabolic acidosis on ABG.', vitals: 'BP: 100/65, HR: 105, RR: 28, O2: 96%', question: 'Methanol poisoning with visual symptoms. ED antidote?', options: ['Ethanol', 'Fomepizole', 'Naloxone', 'Either ethanol or fomepizole'], correct: 3, explanation: 'Methanol poisoning: fomepizole preferred over ethanol (both block alcohol dehydrogenase).' },
            
            { category: 'Emergency Toxicology - Carbon Monoxide Poisoning', urgency: 'high', presentation: '30F family of 4 with headache, nausea, confusion after using generator indoors. Cherry-red skin color noted.', vitals: 'BP: 110/70, HR: 100, RR: 20, O2: 98% pulse ox', question: 'CO poisoning with normal pulse oximetry. ED treatment?', options: ['Supplemental oxygen unnecessary', '100% oxygen', 'Hyperbaric oxygen', '100% oxygen, consider hyperbaric'], correct: 3, explanation: 'CO poisoning: 100% oxygen immediately. Hyperbaric oxygen for severe cases or pregnancy.' },
            
            { category: 'Emergency Toxicology - Benzodiazepine Overdose', urgency: 'medium', presentation: '25M ingested multiple lorazepam tablets, now somnolent but arousable. Slurred speech, ataxia. Respiratory rate borderline.', vitals: 'BP: 110/70, HR: 85, RR: 12, O2: 94%', question: 'Benzodiazepine overdose with mild respiratory depression. ED antidote?', options: ['Naloxone', 'Flumazenil', 'Supportive care preferred', 'Activated charcoal'], correct: 2, explanation: 'Benzodiazepine overdose: supportive care preferred. Flumazenil can cause seizures in mixed overdoses.' },
            
            { category: 'Emergency Toxicology - Ethylene Glycol Poisoning', urgency: 'high', presentation: '40M ingested antifreeze, now with altered mental status, seizures. Calcium oxalate crystals in urine, metabolic acidosis.', vitals: 'BP: 95/60, HR: 110, RR: 26, O2: 95%', question: 'Ethylene glycol poisoning with crystals in urine. ED treatment?', options: ['Fomepizole + hemodialysis', 'Ethanol only', 'Supportive care', 'Activated charcoal'], correct: 0, explanation: 'Ethylene glycol: fomepizole + hemodialysis. Crystals in urine suggest advanced toxicity.' },
            
            { category: 'Emergency Toxicology - Anticholinergic Poisoning', urgency: 'medium', presentation: '16M ingested unknown plant, now with flushed skin, dilated pupils, altered mental status, hyperthermia. "Mad as a hatter."', vitals: 'BP: 140/90, HR: 130, RR: 20, O2: 98%, Temp: 103.2°F', question: 'Anticholinergic toxidrome. ED antidote for severe cases?', options: ['Physostigmine', 'Atropine', 'Naloxone', 'Flumazenil'], correct: 0, explanation: 'Severe anticholinergic poisoning: physostigmine (crosses blood-brain barrier, reverses CNS effects).' },
            
            { category: 'Emergency Toxicology - Iron Overdose', urgency: 'high', presentation: '8M toddler ingested bottle of iron supplements 2 hours ago. Vomiting, diarrhea, abdominal pain. Parents estimate 30 tablets.', vitals: 'BP: 100/60, HR: 120, RR: 24, O2: 96%', question: 'Pediatric iron overdose in early phase. ED treatment?', options: ['Activated charcoal', 'Deferoxamine', 'Gastric lavage', 'Whole bowel irrigation'], correct: 3, explanation: 'Iron overdose: whole bowel irrigation to remove tablets. Deferoxamine for systemic toxicity.' },

            // Psychiatry Cases (10)
            { category: 'Emergency Psychiatry - Acute Psychosis', urgency: 'high', presentation: '28M brought by police for bizarre behavior, paranoid delusions, auditory hallucinations. Agitated, threatening staff. No drug use history.', vitals: 'BP: 140/90, HR: 105, RR: 20, O2: 98%', question: 'Acute psychosis with agitation. ED medication for rapid control?', options: ['Haloperidol IM', 'Lorazepam IM', 'Haloperidol + lorazepam IM', 'Restraints only'], correct: 2, explanation: 'Acute agitated psychosis: haloperidol + lorazepam IM for rapid sedation and antipsychotic effect.' },
            
            { category: 'Emergency Psychiatry - Suicidal Ideation', urgency: 'high', presentation: '35F presents after taking "handful" of pills, states wants to die. Depressed mood, crying, expresses ongoing suicidal thoughts.', vitals: 'BP: 120/80, HR: 88, RR: 16, O2: 98%', question: 'Active suicidal ideation with recent attempt. ED disposition?', options: ['Discharge with outpatient follow-up', 'Psychiatric hold/admission', 'Crisis counselor only', 'Family supervision'], correct: 1, explanation: 'Active suicidal ideation + recent attempt: psychiatric hold/involuntary admission for safety.' },
            
            { category: 'Emergency Psychiatry - Alcohol Withdrawal', urgency: 'medium', presentation: '48M heavy drinker stopped 2 days ago, now tremors, sweating, anxiety, seeing things that aren\'t there. CIWA score 12.', vitals: 'BP: 160/95, HR: 110, RR: 20, O2: 96%, Temp: 100.4°F', question: 'Alcohol withdrawal with hallucinations. ED treatment?', options: ['Thiamine only', 'Lorazepam', 'Haloperidol', 'Lorazepam + thiamine + folate'], correct: 3, explanation: 'Alcohol withdrawal: benzodiazepines + thiamine + folate. Monitor with CIWA protocol.' },
            
            { category: 'Emergency Psychiatry - Delirium Tremens', urgency: 'high', presentation: '52M chronic alcoholic, last drink 3 days ago. Hyperthermia, profuse sweating, confusion, tremors, tachycardia, hypertension.', vitals: 'BP: 180/110, HR: 140, RR: 24, O2: 94%, Temp: 102.8°F', question: 'Delirium tremens. ED management priority?', options: ['High-dose benzodiazepines', 'Antipsychotics', 'Beta-blockers', 'Supportive care only'], correct: 0, explanation: 'Delirium tremens: high-dose benzodiazepines (lorazepam) + supportive care. Life-threatening condition.' },
            
            { category: 'Emergency Psychiatry - Bipolar Mania', urgency: 'medium', presentation: '25F manic episode with decreased sleep, pressured speech, grandiose delusions, hypersexuality. Family reports 3 days without sleep.', vitals: 'BP: 130/85, HR: 95, RR: 18, O2: 98%', question: 'Acute mania without psychotic features. ED medication?', options: ['Lithium', 'Valproic acid', 'Lorazepam', 'Antipsychotic + mood stabilizer'], correct: 3, explanation: 'Acute mania: antipsychotic for rapid control + mood stabilizer (lithium, valproate).' },
            
            { category: 'Emergency Psychiatry - Panic Attack', urgency: 'low', presentation: '30F sudden onset chest pain, SOB, palpitations, feeling of impending doom. Symptoms started 20 minutes ago, no cardiac history.', vitals: 'BP: 140/90, HR: 110, RR: 24, O2: 98%', question: 'Panic attack after ruling out medical causes. ED treatment?', options: ['Lorazepam', 'Propranolol', 'Reassurance + breathing exercises', 'All of the above'], correct: 3, explanation: 'Panic attack: reassurance, breathing exercises, benzodiazepines if severe, beta-blockers for symptoms.' },
            
            { category: 'Emergency Psychiatry - Serotonin Syndrome', urgency: 'high', presentation: '24F on sertraline started tramadol yesterday, now hyperthermia, muscle rigidity, clonus, altered mental status, diaphoresis.', vitals: 'BP: 170/100, HR: 130, RR: 26, O2: 96%, Temp: 104.6°F', question: 'Serotonin syndrome from drug interaction. ED treatment?', options: ['Discontinue serotonergic drugs', 'Cyproheptadine', 'Supportive care + cooling', 'All of the above'], correct: 3, explanation: 'Serotonin syndrome: discontinue offending drugs + cyproheptadine + supportive care/cooling.' },
            
            { category: 'Emergency Psychiatry - Neuroleptic Malignant Syndrome', urgency: 'high', presentation: '40M on haloperidol develops fever, muscle rigidity, altered mental status, autonomic instability. Lead-pipe rigidity noted.', vitals: 'BP: 180/110, HR: 125, RR: 22, O2: 94%, Temp: 105.2°F', question: 'Neuroleptic malignant syndrome. ED treatment?', options: ['Continue antipsychotic', 'Dantrolene + bromocriptine', 'Cooling only', 'Benzodiazepines only'], correct: 1, explanation: 'NMS: discontinue antipsychotic + dantrolene (muscle relaxant) + bromocriptine (dopamine agonist).' },
            
            { category: 'Emergency Psychiatry - Homicidal Ideation', urgency: 'high', presentation: '32M paranoid delusions about neighbor, states plans to "take care of him tonight." Specific threats with access to weapons.', vitals: 'BP: 135/85, HR: 100, RR: 18, O2: 98%', question: 'Specific homicidal threats with plan. ED legal obligation?', options: ['Patient confidentiality maintained', 'Warn intended victim (Tarasoff duty)', 'Police notification only', 'Both warn victim and notify police'], correct: 3, explanation: 'Specific homicidal threats: duty to warn intended victim + notify law enforcement.' },
            
            { category: 'Emergency Psychiatry - Catatonia', urgency: 'medium', presentation: '26M with schizophrenia presents with mutism, immobility, waxy flexibility, posturing. Family reports 2 days of not eating or drinking.', vitals: 'BP: 110/70, HR: 85, RR: 14, O2: 98%', question: 'Catatonia with decreased oral intake. ED treatment?', options: ['Antipsychotics', 'Lorazepam', 'ECT', 'Lorazepam trial first'], correct: 3, explanation: 'Catatonia: lorazepam trial first-line. ECT if benzodiazepines ineffective or malignant catatonia.' }
        ];

        // App state
        let currentCaseIndex = 0;
        let selectedAnswer = null;
        let showingExplanation = false;
        let stats = { correct: 0, total: 0, streak: 0, maxStreak: 0 };
        let currentFilter = 'all';
        let incorrectCases = []; // Track cases answered incorrectly
        let isFlashcardMode = false;
        let flashcardStats = { known: 0, needPractice: 0, total: 0 };
        let currentFlashcardFlipped = false;
        let isEditorMode = false;
        let editingCaseIndex = -1;
        let editingFlashcardIndex = -1;
        let availableSpecialties = [
            'Cardiology', 'Pulmonology', 'Neurology', 'Endocrinology', 'Gastroenterology', 
            'Nephrology', 'Trauma', 'Infectious Disease', 'Toxicology', 'Psychiatry',
            'Orthopedics', 'Pediatrics', 'OB/GYN', 'Ophthalmology', 'ENT', 'Radiology',
            'Sports Medicine', 'Geriatrics', 'Dermatology'
        ];


function updateFlashcardCategoryDropdown() {
    const flashcardSelect = document.getElementById('flashcard-category-input');
    flashcardSelect.innerHTML = '';

    availableSpecialties.forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        flashcardSelect.appendChild(option);
    });
}


        // Emergency Medicine Flashcards - Key Facts
        const flashcards = [
            { question: "STEMI: Door-to-balloon time goal?", answer: "< 90 minutes for primary PCI\n< 30 minutes for thrombolytics if PCI not available", category: "Cardiology" },
            { question: "Tension pneumothorax: Immediate treatment?", answer: "14G needle decompression\n2nd intercostal space, midclavicular line\nDo NOT wait for chest X-ray", category: "Pulmonology" },
            { question: "Status epilepticus: First-line medication?", answer: "IV Lorazepam 4mg OR IV Diazepam 10mg\nRepeat once if seizure continues\nThen phenytoin/fosphenytoin", category: "Neurology" },
            { question: "DKA triad?", answer: "1. Hyperglycemia (>250 mg/dL)\n2. Ketosis (urine/serum ketones)\n3. Metabolic acidosis (pH <7.3, HCO3 <15)", category: "Endocrinology" },
            { question: "GI bleed in cirrhosis: Additional treatments?", answer: "Octreotide (reduces portal pressure)\nProphylactic antibiotics\nPPI therapy\nConsider TIPS if refractory", category: "Gastroenterology" },
            { question: "Hyperkalemia with wide QRS: Treatment sequence?", answer: "1. Calcium gluconate (cardiac protection)\n2. Insulin + D50 (shift K+ intracellularly)\n3. Albuterol nebulizer\n4. Consider dialysis", category: "Nephrology" },
            { question: "FAST exam positive + hypotension: Next step?", answer: "Emergency exploratory laparotomy\nDo NOT get CT scan\nUnstable patient needs immediate surgery", category: "Trauma" },
            { question: "Sepsis bundle (1-hour): What must be done?", answer: "1. Blood cultures\n2. Broad-spectrum antibiotics\n3. Lactate level\n4. 30mL/kg IV fluids if hypotensive", category: "Infectious Disease" },
            { question: "Acetaminophen overdose: Antidote and timing?", answer: "N-acetylcysteine (NAC)\nMost effective within 8 hours\nStill beneficial up to 24 hours\nUse nomogram to guide treatment", category: "Toxicology" },
            { question: "Acute agitated psychosis: Medication combo?", answer: "Haloperidol 5-10mg IM\n+ Lorazepam 2-4mg IM\nCombination provides rapid sedation + antipsychotic effect", category: "Psychiatry" },
            
            { question: "Cardiac tamponade: Beck's triad?", answer: "1. Elevated JVP\n2. Hypotension\n3. Muffled heart sounds\n+ Pulsus paradoxus >20mmHg", category: "Cardiology" },
            { question: "Massive PE: Bedside assessment priority?", answer: "Bedside echocardiogram\nLook for RV strain/dilation\nDo NOT delay for CT if unstable", category: "Pulmonology" },
            { question: "Stroke: tPA contraindications (major)?", answer: "• Onset >4.5 hours\n• Active bleeding\n• Recent surgery <14 days\n• BP >185/110 (persistent)\n• Platelets <100k", category: "Neurology" },
            { question: "Thyroid storm: Treatment combo?", answer: "1. PTU (blocks synthesis)\n2. Propranolol (beta-blocker)\n3. Iodine (blocks release)\n4. Steroids (hydrocortisone)", category: "Endocrinology" },
            { question: "Acute pancreatitis: Initial ED management?", answer: "Aggressive IV fluid resuscitation\nLactated Ringer's preferred\nAdequate pain control\nNPO", category: "Gastroenterology" },
            { question: "Rhabdomyolysis: Treatment priority?", answer: "Aggressive IV fluid resuscitation\nPrevent AKI from myoglobin precipitation\nUrine output goal: 1-2 mL/kg/hr", category: "Nephrology" },
            { question: "Flail chest with respiratory failure: Treatment?", answer: "Positive pressure ventilation\nBiPAP or intubation\nDo NOT use sandbags or external stabilization", category: "Trauma" },
            { question: "Necrotizing fasciitis: Management?", answer: "Emergency surgical debridement\n+ Broad-spectrum antibiotics\nTime is tissue - do not delay", category: "Infectious Disease" },
            { question: "Tricyclic overdose with wide QRS: Treatment?", answer: "Sodium bicarbonate\nNarrows QRS complex\nImproves hemodynamics\nTarget pH 7.45-7.55", category: "Toxicology" },
            { question: "Delirium tremens: First-line treatment?", answer: "High-dose benzodiazepines\nLorazepam preferred\nCIWA protocol for monitoring\nLife-threatening condition", category: "Psychiatry" },
            
            { question: "A-fib with RVR: Rate control agents?", answer: "Metoprolol 2.5-5mg IV q5min\nOR Diltiazem 0.25mg/kg IV\nAvoid digoxin in acute setting", category: "Cardiology" },
            { question: "Asthma: Severe exacerbation treatment?", answer: "Continuous albuterol nebulizer\n+ Ipratropium bromide\n+ Systemic corticosteroids\nConsider magnesium if severe", category: "Pulmonology" },
            { question: "SAH with normal CT: Next step?", answer: "Lumbar puncture\nLook for xanthochromia\nRBCs that don't clear from tube 1→4\nCT only 95% sensitive first 24h", category: "Neurology" },
            { question: "Adrenal crisis: Immediate treatment?", answer: "IV hydrocortisone 100-200mg\nAggressive fluid resuscitation\nDo NOT wait for cosyntropin test", category: "Endocrinology" },
            { question: "Cholangitis (Charcot's triad): Treatment?", answer: "Broad-spectrum antibiotics\nFluid resuscitation\nUrgent ERCP for decompression\nRUQ pain + jaundice + fever", category: "Gastroenterology" },
            { question: "Acute urinary retention: Immediate management?", answer: "Foley catheter insertion\nImmediate relief of obstruction\nPost-void residual >400mL diagnostic", category: "Nephrology" },
            { question: "Open fracture: ED management priorities?", answer: "Antibiotics within 1 hour\nTetanus prophylaxis\nOrthopedic consultation\nNO reduction attempts in ED", category: "Trauma" },
            { question: "Endocarditis in IVDU: Antibiotic coverage?", answer: "Vancomycin + gentamicin\nCovers MRSA and gram-negatives\nOften tricuspid valve involvement", category: "Infectious Disease" },
            { question: "Carbon monoxide poisoning: Treatment?", answer: "100% oxygen immediately\nHyperbaric oxygen for severe cases\nPulse oximetry unreliable", category: "Toxicology" },
            { question: "Serotonin syndrome: Treatment triad?", answer: "1. Discontinue serotonergic drugs\n2. Cyproheptadine (5HT antagonist)\n3. Supportive care + cooling", category: "Psychiatry" }
        ];

        function getFilteredCases() {
            if (currentFilter === 'all') return allCases;
            if (currentFilter === 'review') return incorrectCases.map(index => allCases[index]);
            return allCases.filter(c => c.category.includes(currentFilter));
        }

        function toggleFlashcardMode() {
            isFlashcardMode = !isFlashcardMode;
            
            const flashcardBtn = document.getElementById('flashcard-btn');
            const caseContainer = document.getElementById('case-container');
            const flashcardContainer = document.getElementById('flashcard-container');
            
            if (isFlashcardMode) {
                // Switch to flashcard mode
                flashcardBtn.classList.add('active');
                caseContainer.style.display = 'none';
                flashcardContainer.style.display = 'block';
                
                // Reset flashcard stats and start
                flashcardStats = { known: 0, needPractice: 0, total: 0 };
                currentCaseIndex = 0;
                currentFlashcardFlipped = false;
                
                // Deactivate other filter buttons
                const buttons = document.querySelectorAll('.filter-btn');
                buttons.forEach(btn => {
                    if (btn !== flashcardBtn) btn.classList.remove('active');
                });
                
                displayFlashcard();
            } else {
                // Switch back to case mode
                flashcardBtn.classList.remove('active');
                caseContainer.style.display = 'block';
                flashcardContainer.style.display = 'none';
                
                // Reset to normal mode
                currentFilter = 'all';
                document.querySelector('.filter-btn').classList.add('active');
                displayCurrentCase();
            }
        }

        function displayFlashcard() {
            const flashcard = flashcards[currentCaseIndex];
            
            if (!flashcard) {
                // All flashcards completed
                document.getElementById('flashcard-question').innerHTML = 
                    '<h2>🎉 Flashcards Complete!</h2><p>Known: ' + flashcardStats.known + 
                    '<br>Need Practice: ' + flashcardStats.needPractice + '</p>';
                document.getElementById('flashcard-answer').innerHTML = 
                    '<p>Great job! Click "Flashcard Mode" again to restart or switch to case mode.</p>';
                document.getElementById('flashcard-stats').textContent = 
                    `Session Complete - Known: ${flashcardStats.known}, Need Practice: ${flashcardStats.needPractice}`;
                return;
            }
            
            // Update flashcard content
            document.getElementById('flashcard-question').innerHTML = 
                '<h3>' + flashcard.question + '</h3><br><span style="font-size: 14px; color: #6b7280;">Category: ' + 
                flashcard.category + '</span>';
            document.getElementById('flashcard-answer').innerHTML = 
                '<div style="font-weight: bold; margin-bottom: 15px;">' + flashcard.answer.replace(/\n/g, '<br>') + '</div>';
            
            // Update stats
            document.getElementById('flashcard-stats').textContent = 
                `Card ${currentCaseIndex + 1} of ${flashcards.length} - Known: ${flashcardStats.known}, Need Practice: ${flashcardStats.needPractice}`;
            
            // Reset flip state
            currentFlashcardFlipped = false;
            document.getElementById('flashcard').classList.remove('flipped');
        }

        function flipCard() {
            if (!currentFlashcardFlipped) {
                document.getElementById('flashcard').classList.add('flipped');
                currentFlashcardFlipped = true;
            }
        }

        function markCard(event, result) {
            // Prevent event bubbling to card flip
            event.stopPropagation();
            
            flashcardStats.total++;
            
            if (result === 'know') {
                flashcardStats.known++;
            } else {
                flashcardStats.needPractice++;
            }
            
            // Move to next flashcard
            currentCaseIndex++;
            
            // Reset flip state and display next card
            currentFlashcardFlipped = false;
            displayFlashcard();
        }

        function handleSpecialtyChange() {
            const specialtySelect = document.getElementById('specialty-select');
            const customInput = document.getElementById('custom-specialty');
            const addBtn = document.getElementById('add-specialty-btn');
            
            if (specialtySelect.value === 'custom') {
                customInput.style.display = 'block';
                addBtn.style.display = 'block';
                customInput.focus();
            } else {
                customInput.style.display = 'none';
                addBtn.style.display = 'none';
                updateCategoryField();
            }
        }

        function saveCustomSpecialty() {
            const customInput = document.getElementById('custom-specialty');
            const specialtySelect = document.getElementById('specialty-select');
            const customSpecialty = customInput.value.trim();
            
            if (customSpecialty) {
                // Add to available specialties if not already there
                if (!availableSpecialties.includes(customSpecialty)) {
                    availableSpecialties.push(customSpecialty);
                    availableSpecialties.sort();
                    
                    // Update the select dropdown
                    updateSpecialtyDropdown();
updateFlashcardCategoryDropdown();
                    
                    // Select the new specialty
                    specialtySelect.value = customSpecialty;
                    updateCategoryField();
                    
                    // Hide custom input
                    customInput.style.display = 'none';
                    document.getElementById('add-specialty-btn').style.display = 'none';
                    customInput.value = '';
                    
                    alert(`"${customSpecialty}" specialty added successfully!`);
                } else {
                    alert('This specialty already exists!');
                    specialtySelect.value = customSpecialty;
                    customInput.style.display = 'none';
                    document.getElementById('add-specialty-btn').style.display = 'none';
                    customInput.value = '';
                    updateCategoryField();
                }
            } else {
                alert('Please enter a specialty name');
                customInput.focus();
            }
        }

        function updateCategoryField() {
            const specialty = document.getElementById('specialty-select').value;
            const condition = document.getElementById('case-condition').value;
            const categoryField = document.getElementById('case-category');
            
            if (specialty && specialty !== 'custom' && condition) {
                categoryField.value = `Emergency ${specialty} - ${condition}`;
            } else if (specialty && specialty !== 'custom') {
                categoryField.value = `Emergency ${specialty} - `;
            } else {
                categoryField.value = '';
            }
        }

        function updateSpecialtyDropdown() {
            const specialtySelect = document.getElementById('specialty-select');
            const currentValue = specialtySelect.value;
            
            // Rebuild options
            let optionsHTML = '<option value="">Select Specialty</option>';
            availableSpecialties.forEach(specialty => {
                optionsHTML += `<option value="${specialty}">${specialty}</option>`;
            });
            optionsHTML += '<option value="custom">🔧 Add New Specialty</option>';
            
            specialtySelect.innerHTML = optionsHTML;
            
            // Restore selection if it still exists
            if (currentValue && availableSpecialties.includes(currentValue)) {
                specialtySelect.value = currentValue;
            }
        }

        function getUniqueCategories() {
            const categories = new Set();
            
            allCases.forEach(case_ => {
                // Extract specialty from category (e.g., "Emergency Cardiology - STEMI" -> "Cardiology")
                const match = case_.category.match(/Emergency\s+([^-]+)/);
                if (match) {
                    const specialty = match[1].trim();
                    categories.add(specialty);
                    
                    // Add to available specialties if not already there
                    if (!availableSpecialties.includes(specialty)) {
                        availableSpecialties.push(specialty);
                    }
                }
            });
            
            // Sort available specialties
            availableSpecialties.sort();
            
            return Array.from(categories).sort();
        }

        function updateFilterButtons() {
            const filtersContainer = document.querySelector('.filters');
            const categories = getUniqueCategories();
            
            // Create new filter buttons HTML
            let filtersHTML = `
                <button class="filter-btn active" onclick="filterCases('all')">All Cases (${allCases.length})</button>
                <button class="filter-btn" onclick="filterCases('review')" id="review-btn">Review Mode (${incorrectCases.length})</button>
                <button class="filter-btn" onclick="toggleFlashcardMode()" id="flashcard-btn">Flashcard Mode</button>
                <button class="filter-btn" onclick="toggleEditor()" id="editor-btn">Content Editor</button>
            `;
            
            // Add buttons for each detected category
            categories.forEach(category => {
                const count = allCases.filter(c => c.category.includes(category)).length;
                filtersHTML += `<button class="filter-btn" onclick="filterCases('${category}')">${category} (${count})</button>`;
            });
            
            filtersContainer.innerHTML = filtersHTML;
            
            // Restore active states
            if (isFlashcardMode) {
                document.getElementById('flashcard-btn').classList.add('active');
                document.querySelector('.filter-btn').classList.remove('active');
            } else if (isEditorMode) {
                document.getElementById('editor-btn').classList.add('active');  
                document.querySelector('.filter-btn').classList.remove('active');
            } else if (currentFilter === 'review') {
                document.getElementById('review-btn').classList.add('active');
                document.querySelector('.filter-btn').classList.remove('active');
            } else if (currentFilter !== 'all') {
                const activeBtn = document.querySelector(`[onclick="filterCases('${currentFilter}')"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                    document.querySelector('.filter-btn').classList.remove('active');
                }
            }
            
            updateReviewButton();
        }

        function getUrgencyBadge(urgency) {
            return `<span class="urgency-badge urgency-${urgency}">${urgency.toUpperCase()}</span>`;
        }

        function displayCurrentCase() {
            const cases = getFilteredCases();
            const currentCase = cases[currentCaseIndex];
            
            if (!currentCase) {
                document.getElementById('case-title').textContent = 'No cases found';
                document.getElementById('presentation').textContent = currentFilter === 'review' ? 
                    'Great job! You haven\'t gotten any cases wrong yet. Keep practicing!' : 
                    'No cases match this filter.';
                document.getElementById('vitals').textContent = '';
                document.getElementById('question').textContent = '';
                document.getElementById('options').innerHTML = '';
                document.getElementById('explanation').style.display = 'none';
                document.getElementById('next-btn').style.display = 'none';
                return;
            }

            // Update case display
            document.getElementById('case-title').innerHTML = currentCase.category + getUrgencyBadge(currentCase.urgency);
            document.getElementById('presentation').textContent = currentCase.presentation;
            document.getElementById('vitals').textContent = currentCase.vitals;
            document.getElementById('question').textContent = currentCase.question;

            // Update stats
            const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            document.getElementById('accuracy').textContent = accuracy + '%';
            document.getElementById('score').textContent = stats.correct + '/' + stats.total;
            document.getElementById('streak').textContent = stats.streak;
            document.getElementById('case-progress').textContent = (currentCaseIndex + 1) + '/' + cases.length;

            // Update options
            let optionsHTML = '';
            for (let i = 0; i < currentCase.options.length; i++) {
                let optionClass = 'option';
                if (showingExplanation) {
                    if (i === currentCase.correct) {
                        optionClass += ' correct';
                    } else if (i === selectedAnswer && i !== currentCase.correct) {
                        optionClass += ' incorrect';
                    }
                }
                optionsHTML += '<button class="' + optionClass + '" onclick="selectAnswer(' + i + ')">' + currentCase.options[i] + '</button>';
            }
            document.getElementById('options').innerHTML = optionsHTML;

            // Update explanation
            if (showingExplanation) {
                document.getElementById('explanation-text').textContent = currentCase.explanation;
                document.getElementById('explanation').style.display = 'block';
                document.getElementById('next-btn').style.display = 'block';
            } else {
                document.getElementById('explanation').style.display = 'none';
                document.getElementById('next-btn').style.display = 'none';
            }
        }

        function selectAnswer(answerIndex) {
            if (showingExplanation) return;

            selectedAnswer = answerIndex;
            const cases = getFilteredCases();
            const currentCase = cases[currentCaseIndex];
            const isCorrect = answerIndex === currentCase.correct;

            // Find the original case index for tracking incorrect answers
            let originalIndex = currentCaseIndex;
            if (currentFilter !== 'all') {
                originalIndex = allCases.findIndex(c => c === currentCase);
            }

            // Update stats
            stats.total++;
            if (isCorrect) {
                stats.correct++;
                stats.streak++;
                if (stats.streak > stats.maxStreak) {
                    stats.maxStreak = stats.streak;
                }
                
                // Remove from incorrect cases if it was there and now correct
                const incorrectIndex = incorrectCases.indexOf(originalIndex);
                if (incorrectIndex > -1) {
                    incorrectCases.splice(incorrectIndex, 1);
                }
            } else {
                stats.streak = 0;
                
                // Add to incorrect cases if not already there
                if (!incorrectCases.includes(originalIndex)) {
                    incorrectCases.push(originalIndex);
                }
            }

            showingExplanation = true;
            updateReviewButton();
            displayCurrentCase();
        }

        function nextCase() {
            const cases = getFilteredCases();
            
            if (currentCaseIndex < cases.length - 1) {
                currentCaseIndex++;
            } else {
                currentCaseIndex = 0;
            }

            selectedAnswer = null;
            showingExplanation = false;
            displayCurrentCase();
        }

        function updateReviewButton() {
            const reviewBtn = document.getElementById('review-btn');
            reviewBtn.textContent = `Review Mode (${incorrectCases.length})`;
            
            // Enable/disable review button based on incorrect cases
            if (incorrectCases.length === 0) {
                reviewBtn.style.opacity = '0.5';
                reviewBtn.style.cursor = 'not-allowed';
            } else {
                reviewBtn.style.opacity = '1';
                reviewBtn.style.cursor = 'pointer';
            }
        }

        function toggleEditor() {
            isEditorMode = !isEditorMode;
            
            const editorBtn = document.getElementById('editor-btn');
            const caseContainer = document.getElementById('case-container');
            const flashcardContainer = document.getElementById('flashcard-container');
            const editorContainer = document.getElementById('editor-container');
            
            if (isEditorMode) {
                // Switch to editor mode
                editorBtn.classList.add('active');
                caseContainer.style.display = 'none';
                flashcardContainer.style.display = 'none';
                editorContainer.style.display = 'block';
                
                // Deactivate other filter buttons
                const buttons = document.querySelectorAll('.filter-btn');
                buttons.forEach(btn => {
                    if (btn !== editorBtn) btn.classList.remove('active');
                });
                
                // Reset editor state
                switchEditorTab('case');
                updateContentManagement();
            } else {
                // Switch back to case mode
                editorBtn.classList.remove('active');
                caseContainer.style.display = 'block';
                flashcardContainer.style.display = 'none';
                editorContainer.style.display = 'none';
                
                // Reset to normal mode
                currentFilter = 'all';
                isFlashcardMode = false;
                document.querySelector('.filter-btn').classList.add('active');
                displayCurrentCase();
            }
        }

        function switchEditorTab(tab) {
    if (tab === 'flashcard') updateFlashcardCategoryDropdown();
            // Update active tab
            const tabs = document.querySelectorAll('.editor-tab');
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector(`[onclick="switchEditorTab('${tab}')"]`).classList.add('active');
            
            // Update active form
            const forms = document.querySelectorAll('.editor-form');
            forms.forEach(f => f.classList.remove('active'));
            document.getElementById(`${tab}-form`).classList.add('active');
            
            if (tab === 'manage') {
                updateContentManagement();
            }
        }

        function saveCase() {
            const category = document.getElementById('case-category').value;
            const urgency = document.getElementById('case-urgency').value;
            const presentation = document.getElementById('case-presentation').value;
            const vitals = document.getElementById('case-vitals').value;
            const question = document.getElementById('case-question').value;
            const explanation = document.getElementById('case-explanation').value;
            
            const options = [
                document.getElementById('option-0').value,
                document.getElementById('option-1').value,
                document.getElementById('option-2').value,
                document.getElementById('option-3').value
            ];
            
            const correctRadio = document.querySelector('input[name="correct"]:checked');
            
            // Validation
            if (!category || !presentation || !vitals || !question || !explanation) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (options.some(opt => !opt.trim())) {
                alert('Please fill in all answer options');
                return;
            }
            
            if (!correctRadio) {
                alert('Please select the correct answer');
                return;
            }
            
            const newCase = {
                category: category,
                urgency: urgency,
                presentation: presentation,
                vitals: vitals,
                question: question,
                options: options,
                correct: parseInt(correctRadio.value),
                explanation: explanation
            };
            
            if (editingCaseIndex >= 0) {
                // Update existing case
                allCases[editingCaseIndex] = newCase;
                editingCaseIndex = -1;
                alert('Case updated successfully!');
            } else {
                // Add new case
                allCases.push(newCase);
                alert('Case added successfully!');
const customCases = JSON.parse(localStorage.getItem('customCases') || '[]');
customCases.push(newCase);
localStorage.setItem('customCases', JSON.stringify(customCases));
            }
            
            clearCaseForm();
            updateContentManagement();
            updateFilterButtons();
        }

        function saveFlashcard() {
            const question = document.getElementById('flashcard-question-input').value;
            const answer = document.getElementById('flashcard-answer-input').value;
            const category = document.getElementById('flashcard-category-input').value;
            
            // Validation
            if (!question || !answer) {
                alert('Please fill in both question and answer');
                return;
            }
            
            const newFlashcard = {
                question: question,
                answer: answer,
                category: category
            };
            
            if (editingFlashcardIndex >= 0) {
                // Update existing flashcard
                flashcards[editingFlashcardIndex] = newFlashcard;
                editingFlashcardIndex = -1;
                alert('Flashcard updated successfully!');
            } else {
                // Add new flashcard
                flashcards.push(newFlashcard);
                alert('Flashcard added successfully!');
const customFlashcards = JSON.parse(localStorage.getItem('customFlashcards') || '[]');
customFlashcards.push(newFlashcard);
localStorage.setItem('customFlashcards', JSON.stringify(customFlashcards));
            }
            
            clearFlashcardForm();
            updateContentManagement();
        }

        function clearCaseForm() {
            document.getElementById('specialty-select').value = '';
            document.getElementById('case-category').value = '';
            document.getElementById('case-condition').value = '';
            document.getElementById('case-urgency').value = 'high';
            document.getElementById('case-presentation').value = '';
            document.getElementById('case-vitals').value = '';
            document.getElementById('case-question').value = '';
            document.getElementById('case-explanation').value = '';
            
            for (let i = 0; i < 4; i++) {
                document.getElementById(`option-${i}`).value = '';
            }
            
            const radios = document.querySelectorAll('input[name="correct"]');
            radios.forEach(radio => radio.checked = false);
            
            editingCaseIndex = -1;
            document.querySelector('#case-form h3').textContent = 'Create New Case';
            document.querySelector('#case-form .submit-btn').textContent = 'Add Case';
        }

        function clearFlashcardForm() {
            document.getElementById('flashcard-question-input').value = '';
            document.getElementById('flashcard-answer-input').value = '';
            document.getElementById('flashcard-category-input').value = 'Cardiology';
            
            editingFlashcardIndex = -1;
            document.querySelector('#flashcard-form h3').textContent = 'Create New Flashcard';
            document.querySelector('#flashcard-form .submit-btn').textContent = 'Add Flashcard';
        }

        function updateContentManagement() {
            // Update totals
            document.getElementById('total-cases').textContent = allCases.length;
            document.getElementById('total-flashcards').textContent = flashcards.length;
            
            // Update case list (show last 10)
            const caseList = document.getElementById('case-list');
            const recentCases = allCases.slice(-10).reverse();
            
            caseList.innerHTML = recentCases.map((case_, index) => {
                const realIndex = allCases.length - 1 - index;
                return `
                    <div class="content-item">
                        <div class="content-preview">
                            <div class="content-title">${case_.category}</div>
                            <div class="content-summary">${case_.presentation.substring(0, 100)}...</div>
                        </div>
                        <div class="content-actions">
                            <button class="edit-btn" onclick="editCase(${realIndex})">Edit</button>
                            <button class="delete-btn" onclick="deleteCase(${realIndex})">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Update flashcard list (show last 10)
            const flashcardList = document.getElementById('flashcard-list');
            const recentFlashcards = flashcards.slice(-10).reverse();
            
            flashcardList.innerHTML = recentFlashcards.map((card, index) => {
                const realIndex = flashcards.length - 1 - index;
                return `
                    <div class="content-item">
                        <div class="content-preview">
                            <div class="content-title">${card.question}</div>
                            <div class="content-summary">${card.category}</div>
                        </div>
                        <div class="content-actions">
                            <button class="edit-btn" onclick="editFlashcard(${realIndex})">Edit</button>
                            <button class="delete-btn" onclick="deleteFlashcard(${realIndex})">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function editCase(index) {
            const case_ = allCases[index];
            editingCaseIndex = index;
            
            // Extract specialty and condition from category
            const match = case_.category.match(/Emergency\s+([^-]+)\s*-\s*(.+)/);
            if (match) {
                const specialty = match[1].trim();
                const condition = match[2].trim();
                
                document.getElementById('specialty-select').value = specialty;
                document.getElementById('case-condition').value = condition;
            }
            
            // Fill form with existing data
            document.getElementById('case-category').value = case_.category;
            document.getElementById('case-urgency').value = case_.urgency;
            document.getElementById('case-presentation').value = case_.presentation;
            document.getElementById('case-vitals').value = case_.vitals;
            document.getElementById('case-question').value = case_.question;
            document.getElementById('case-explanation').value = case_.explanation;
            
            for (let i = 0; i < 4; i++) {
                document.getElementById(`option-${i}`).value = case_.options[i];
            }
            
            document.querySelector(`input[name="correct"][value="${case_.correct}"]`).checked = true;
            
            // Update form labels
            document.querySelector('#case-form h3').textContent = 'Edit Case';
            document.querySelector('#case-form .submit-btn').textContent = 'Update Case';
            
            // Switch to case form
            switchEditorTab('case');
        }

        function editFlashcard(index) {
            const card = flashcards[index];
            editingFlashcardIndex = index;
            
            // Fill form with existing data
            document.getElementById('flashcard-question-input').value = card.question;
            document.getElementById('flashcard-answer-input').value = card.answer;
            document.getElementById('flashcard-category-input').value = card.category;
            
            // Update form labels
            document.querySelector('#flashcard-form h3').textContent = 'Edit Flashcard';
            document.querySelector('#flashcard-form .submit-btn').textContent = 'Update Flashcard';
            
            // Switch to flashcard form
            switchEditorTab('flashcard');
        }

        function deleteCase(index) {
            if (confirm('Are you sure you want to delete this case?')) {
                allCases.splice(index, 1);
                
                // Update incorrect cases array
                incorrectCases = incorrectCases.filter(i => i !== index).map(i => i > index ? i - 1 : i);
                
                updateContentManagement();
                updateFilterButtons();
                alert('Case deleted successfully!');
            }
        }

        function deleteFlashcard(index) {
            if (confirm('Are you sure you want to delete this flashcard?')) {
                flashcards.splice(index, 1);
                updateContentManagement();
                alert('Flashcard deleted successfully!');
            }
        }

        function filterCases(filter) {
            // Don't allow review mode if no incorrect cases
            if (filter === 'review' && incorrectCases.length === 0) {
                return;
            }
            
            // Exit other modes if switching filters
            if (isFlashcardMode) {
                toggleFlashcardMode();
            }
            if (isEditorMode) {
                toggleEditor();
            }
            
            currentFilter = filter;
            currentCaseIndex = 0;
            selectedAnswer = null;
            showingExplanation = false;

            // Update filter buttons
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            displayCurrentCase();
        }

        // Initialize the app
        updateReviewButton();
        updateFilterButtons();
        updateSpecialtyDropdown();
updateFlashcardCategoryDropdown();
        displayCurrentCase();
});
