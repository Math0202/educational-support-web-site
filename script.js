document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Create modal first
    const modal = createModal();
    document.body.appendChild(modal);

    // Tab Functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const questionLists = document.querySelectorAll('.question-list');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        questionLists.forEach(list => {
            const questions = list.querySelectorAll('li span');
            questions.forEach(question => {
                const text = question.textContent.toLowerCase();
                const listItem = question.closest('li');
                if (text.includes(searchTerm)) {
                    listItem.style.display = '';
                } else {
                    listItem.style.display = 'none';
                }
            });
        });
    });

    // Button Actions
    const askQuestionBtn = document.querySelector('.card-footer .btn-primary');
    const shareAdviceBtn = document.querySelector('.card-footer .btn-outline');
    const requestSupportBtn = document.querySelector('.card-footer .btn-secondary');

    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', () => {
            console.log('Ask Question clicked');
            showModal('Ask a Question', `
                <form id="question-form" class="modal-form">
                    <div class="form-group">
                        <label for="question-title">Question Title</label>
                        <input type="text" id="question-title" required placeholder="Enter your question title">
                    </div>
                    <div class="form-group">
                        <label for="question-details">Details</label>
                        <textarea id="question-details" rows="4" placeholder="Provide more details about your question"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="question-category">Category</label>
                        <select id="question-category">
                            <option value="academic">Academic</option>
                            <option value="career">Career</option>
                            <option value="financial">Financial</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
            `);
        });
    }

    if (shareAdviceBtn) {
        shareAdviceBtn.addEventListener('click', () => {
            console.log('Share Advice clicked');
            showModal('Share Advice', `
                <form id="advice-form" class="modal-form">
                    <div class="form-group">
                        <label for="advice-title">Title</label>
                        <input type="text" id="advice-title" required placeholder="Enter the title of your advice">
                    </div>
                    <div class="form-group">
                        <label for="advice-content">Your Advice</label>
                        <textarea id="advice-content" rows="4" placeholder="Share your experience and advice"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="advice-category">Category</label>
                        <select id="advice-category">
                            <option value="study">Study Tips</option>
                            <option value="motivation">Motivation</option>
                            <option value="career">Career Guidance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
            `);
        });
    }

    if (requestSupportBtn) {
        requestSupportBtn.addEventListener('click', () => {
            console.log('Request Support clicked');
            showModal('Request Support', `
                <form id="support-form" class="modal-form">
                    <div class="form-group">
                        <label for="support-type">Type of Support Needed</label>
                        <select id="support-type">
                            <option value="financial">Financial Support</option>
                            <option value="academic">Academic Support</option>
                            <option value="materials">Learning Materials</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="support-details">Details</label>
                        <textarea id="support-details" rows="4" placeholder="Describe what kind of support you need"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="support-amount">Amount Needed (if applicable)</label>
                        <input type="number" id="support-amount" placeholder="Enter amount in N$">
                    </div>
                </form>
            `);
        });
    }


    // Helper Functions
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content"></div>
                <div class="modal-footer">
                    <button class="btn btn-outline modal-cancel">Cancel</button>
                    <button class="btn btn-primary modal-submit">Submit</button>
                </div>
            </div>
        `;

        // Close modal on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close modal on close button click
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Cancel button
        modal.querySelector('.modal-cancel').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Submit button
        modal.querySelector('.modal-submit').addEventListener('click', () => {
            const form = modal.querySelector('form');
            if (form && form.checkValidity()) {
                // Here you would typically send the form data to your server
                alert('Form submitted successfully!');
                modal.classList.add('hidden');
            } else {
                form.reportValidity();
            }
        });

        return modal;
    }

    function showModal(title, content) {
        const modal = document.querySelector('.modal');
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-content').innerHTML = content;
        modal.classList.remove('hidden');
    }

    // Add these functions to your existing JavaScript

// Handle answer submission
function handleAnswerSubmit(questionId) {
    const answerForm = document.querySelector(`#answer-form-${questionId}`);
    if (answerForm) {
        answerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answerContent = answerForm.querySelector('textarea').value;
            // Here you would send the answer to your backend
            console.log('Answer submitted:', answerContent);
            // Add answer to the UI
            addAnswerToUI(questionId, answerContent);
        });
    }
}

// Add answer to UI
function addAnswerToUI(questionId, content) {
    const answersList = document.querySelector(`#answers-${questionId}`);
    if (answersList) {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer';
        answerElement.innerHTML = `
            <div class="user-info">
                <div class="avatar">
                    <img src="/placeholder.svg?height=32&width=32" alt="User">
                    <span class="avatar-fallback">ME</span>
                </div>
                <span class="username">Me</span>
                <span class="timestamp">Just now</span>
            </div>
            <p class="answer-content">${content}</p>
            <div class="answer-actions">
                <button class="btn btn-outline btn-sm">
                    <i data-lucide="thumbs-up"></i>
                    Helpful (0)
                </button>
            </div>
        `;
        answersList.appendChild(answerElement);
        lucide.createIcons();
    }
}

// Handle donation modal
function showDonationModal(requestId = null, amount = null) {
    showModal('Make a Donation', `
        <form id="donation-form" class="payment-form">
            <div class="form-group">
                <label>Select Amount</label>
                <div class="payment-amount">
                    <div class="amount-preset" data-amount="50">N$50</div>
                    <div class="amount-preset" data-amount="100">N$100</div>
                    <div class="amount-preset" data-amount="200">N$200</div>
                    <div class="amount-preset" data-amount="500">N$500</div>
                </div>
                <input type="number" class="card-input" placeholder="Other amount" 
                       value="${amount || ''}" min="1" step="1">
            </div>
            <div class="form-group">
                <label>Card Information</label>
                <div class="card-element">
                    <div class="form-row">
                        <input type="text" class="card-input" placeholder="Card number" required>
                    </div>
                    <div class="form-row" style="display: flex; gap: 1rem;">
                        <input type="text" class="card-input" placeholder="MM/YY" required>
                        <input type="text" class="card-input" placeholder="CVC" required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Name on Card</label>
                <input type="text" class="card-input" placeholder="Name on card" required>
            </div>
            ${requestId ? `<input type="hidden" name="request_id" value="${requestId}">` : ''}
        </form>
    `);

    // Handle amount preset selection
    document.querySelectorAll('.amount-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            document.querySelectorAll('.amount-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
            document.querySelector('input[type="number"]').value = preset.dataset.amount;
        });
    });
}

// Add event listeners for new buttons
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code) ...

    // Add event listeners for donate buttons
    document.querySelectorAll('.donate-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const requestCard = e.target.closest('.support-request-card');
            const requestId = requestCard.dataset.requestId;
            const amountNeeded = requestCard.querySelector('.badge').textContent.match(/\d+/)[0];
            
            showDonationModal(requestId, amountNeeded);
        });
    });

    // Add event listener for main donate button
    const donateAllBtn = document.querySelector('.donate-all-btn');
    if (donateAllBtn) {
        donateAllBtn.addEventListener('click', () => {
            showDonationModal();
        });
    }

    // Add event listeners for answer buttons
    document.querySelectorAll('.question-actions .btn').forEach(button => {
        if (button.textContent.includes('Answer')) {
            button.addEventListener('click', (e) => {
                const questionThread = e.target.closest('.question-thread');
                const answersList = questionThread.querySelector('.answers-list');
                if (!questionThread.querySelector('.answer-form')) {
                    const answerForm = document.createElement('div');
                    answerForm.className = 'answer-form';
                    answerForm.innerHTML = `
                        <form class="modal-form">
                            <div class="form-group">
                                <label>Your Answer</label>
                                <textarea rows="4" required placeholder="Share your knowledge or experience..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">Submit Answer</button>
                        </form>
                    `;
                    answersList.appendChild(answerForm);
                    
                    answerForm.querySelector('form').addEventListener('submit', (e) => {
                        e.preventDefault();
                        const content = e.target.querySelector('textarea').value;
                        addAnswerToUI(questionThread.dataset.questionId, content);
                        answerForm.remove();
                    });
                }
            });
        }
    });
});
});